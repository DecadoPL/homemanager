export class ExpenseFromPDF{
  constructor(
      public date: string,
      public id: string,
      public type: string,
      public value: string,
      public description: string,
      public location: string,
    ) {}
}