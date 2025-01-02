import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ExpenseMONGO } from "../models/expenses/expenseMONGO.model";
import { ExpenseListItemMONGO } from "../models/expenses/expenseListItemMONGO.model";

@Injectable()
export class ExpensesService{

  constructor(private http: HttpClient){}

  private urlMONGO = environment.backendMainUrl + 'api/expenses/';

  saveExpenseMONGO(expense: ExpenseMONGO): Observable<{message: string, expenseId: string}> {
    return this.http.post<{message: string, expenseId: string}>(this.urlMONGO, expense)
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        throw new Error(error.error.message)
      })
    )
  }

  getExpensesListMONGO(): Observable<ExpenseMONGO[]>{
    return this.http.get<{message: String, expenses: ExpenseMONGO[]}>(this.urlMONGO)
      .pipe(
        map((expensesData: any) => {
          return expensesData.expenses;
        })
      )
  }

  getSearchExpensesMONGO(searchName: string): Observable<ExpenseMONGO[]> {
    return this.http.get<{message: string, expenses: ExpenseMONGO[]}>(this.urlMONGO+ 'search/' + searchName)
      .pipe(
        map((expensesData: any) => {
          return expensesData.expenses;
        })
      );
  }

  getExpenseMONGO(id: string): Observable<ExpenseMONGO>{
    return this.http.get<{message: String, expense: ExpenseMONGO}>(this.urlMONGO+id)
      .pipe(
        map((expensesData: any) => {
          return expensesData.expense;
        }),
        catchError((error) => {
          throw new Error(error.error.message)
        })
      )
  }

  deleteExpenseMONGO(id: string): Observable<{message: string}>{
    const url = `${this.urlMONGO}delete/${id}`;
    return this.http.delete<{message: string}>(url)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          throw new Error(error.error.message)
        })
      )
  }
 
  // copyExpenseMONGO(id: string): Observable<{message: string}>{
  //   const url = `${this.urlMONGO}copy/${id}`;
  //   return this.http.get<{message: string}>(url)
  //     .pipe(
  //       map((response) => {
  //         return response;
  //       }),
  //       catchError((error) => {
  //         throw new Error(error.error.message)
  //       })
  //     )
  // }
}