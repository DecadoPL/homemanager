import { ExpenseCategoryMONGO } from "./expenseCategoryMONGO.model";

export class ExpenseTargetMONGO{
    constructor(
        public _id: string | undefined,
        public expenseTargetName: string,
        public expenseBankTargetName: string, //nazwa sklepu pod którą sklep występuje w banku - żeby zaciągać z podsumowania miesiąca bankowego
        public expenseTargetCategory: ExpenseCategoryMONGO
      ) {}
}