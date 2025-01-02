import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ExpenseTargetMONGO } from "../models/expenses/expenseTargetMONGO.model";

@Injectable()
export class ExpenseTargetService{

  constructor(private http: HttpClient){}

  private urlMONGO = environment.backendMainUrl + 'api/expenseTargets/';

  getExpenseTargetsMONGO(): Observable<ExpenseTargetMONGO[]>{
    return this.http.get<{message: string, expenseTarget: ExpenseTargetMONGO[]}>(this.urlMONGO)
      .pipe(
        map((expenseTargetData: any) => {
          return expenseTargetData.expenseTargets;
        })
      );
  }

  saveExpenseTargetMONGO(expenseTarget: ExpenseTargetMONGO): Observable<{message: string, expenseTargetId: string}> {
    return this.http.post<{message: string, expenseTargetId: string}>(this.urlMONGO, expenseTarget)
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        throw new Error(error.error.message);
      })
    );
  }

  // deletePortionNameMONGO(id:string): Observable<{message: string}> {
  //   const url = `${this.urlMONGO}/delete/${id}`;
  //   return this.http.delete<{message: string}>(url)
  //     .pipe(
  //       map((response) => {
  //         return response;
  //       }),
  //       catchError((error) => {
  //         throw new Error(error.error.message);
  //       })
  //     );
  // }
}