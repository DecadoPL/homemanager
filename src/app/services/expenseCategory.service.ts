import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ExpenseCategoryMONGO } from "../models/expenses/expenseCategoryMONGO.model";

@Injectable()
export class ExpenseCategoryService{

  constructor(private http: HttpClient){}

  private urlMONGO = environment.backendMainUrl + 'api/expenseCategories/';

  getExpenseCategoriesMONGO(): Observable<ExpenseCategoryMONGO[]>{
    return this.http.get<{message: string, expenseCategories: ExpenseCategoryMONGO[]}>(this.urlMONGO)
      .pipe(
        map((expenseCategoriesData: any) => {
          return expenseCategoriesData.expenseCategories;
        })
      );
  }

  // savePortionNameMONGO(portionName: PortionNameMONGO): Observable<{message: string, portionNameId: string}> {
  //   return this.http.post<{message: string, portionNameId: string}>(this.urlMONGO, portionName)
  //   .pipe(
  //     map((response) => {
  //       return response;
  //     }),
  //     catchError((error) => {
  //       throw new Error(error.error.message);
  //     })
  //   );
  // }

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