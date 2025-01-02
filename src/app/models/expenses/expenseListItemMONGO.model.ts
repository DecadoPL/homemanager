export class ExpenseListItemMONGO{
    public _id: string;
    public expenseName: string;
  
    constructor( 
      _id: string,
      expenseName: string,
    ){
      this._id = _id;
      this.expenseName = expenseName;
    }
  }