import { ExpenseCategoryMONGO } from "./expenseCategoryMONGO.model";
import { ExpenseTargetMONGO } from "./expenseTargetMONGO.model";

export class ExpenseMONGO{
  constructor(
      public _id: string | undefined,
      public expenseName: string,
      public expenseCategory: ExpenseCategoryMONGO, //jedzenie, sport, zdrowie, etc
      public expenseType: string, //planowany,rzeczywisty
      public expenseDate: string,
      public expenseTarget: ExpenseTargetMONGO, //biedronka, apteka, kwakosz, allegro
      public expenseValue: number
    ) {}
}