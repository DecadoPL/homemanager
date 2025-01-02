import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toastService.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseMONGO } from 'src/app/models/expenses/expenseMONGO.model';




@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent  implements OnInit {
  
  parsedData: any = {};
  $expenses!: ExpenseMONGO[]
  expensesToDisplay!: ExpenseMONGO[];
  alertMsg!: string;
  alert: boolean = false;
  itemId!: string;
  searchText!: string;
  loadingFromFile: boolean = false;

  constructor(private expensesService: ExpensesService,
    private toastService: ToastService,
  ){}

  ngOnInit(){
    this.loadExpensesList();
  }

  loadFromFile(){
    this.loadingFromFile = !this.loadingFromFile;
  }

  deleteItem(id: string){
    this.alertMsg = "Do you want to delete?"
    this.alert = true;
    this.itemId = id;
  }

  deleteCancel(){
    this.alert = false;
  }

  loadFromFileCancel(){
    this.loadingFromFile = false
    console.log("loadFromFileCancel")
  }

  loadFromFileConfirm(){
    this.loadingFromFile = false
    this.loadExpensesList();
    console.log("loadFromFileConfirm")

  }

  deleteConfirm(){
    this.expensesService.deleteExpenseMONGO(this.itemId)
    .subscribe({
      next: (response) => {
        this.toastService.showToast(response.message, 'success');
        this.alert=false;
        this.loadExpensesList();
      },
      error: (error) => {
        let errMessage = error.toString()
        this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
        this.alert=false;
        this.loadExpensesList();
      }
    });  
  }

  loadExpensesList(){
    this.expensesService.getExpensesListMONGO()
    .subscribe((expensesList: ExpenseMONGO[]) => {
      this.$expenses = expensesList.sort((a,b) => {
        return a.expenseDate.localeCompare(b.expenseDate);
      });
      this.expensesToDisplay = this.$expenses;
      }
    );
  }

  onSearch(){
    if(this.searchText!=null){
      this.expensesToDisplay = this.$expenses.filter(item => item.expenseName.toLowerCase().includes(this.searchText));
    }else{
      this.expensesToDisplay = this.$expenses;
    }
  }

  // copyItem(id: string){
  //   this.expensesService.copyExpenseMONGO(id).subscribe({
  //     next: (response) => {
  //       this.toastService.showToast(response.message, 'success');
  //       this.alert=false;
  //       this.loadExpensesList();
  //     },
  //     error: (error) => {
  //       let errMessage = error.toString()
  //       this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
  //       this.alert=false;
  //       this.loadExpensesList();
  //     }
  //   });
  // }

}
