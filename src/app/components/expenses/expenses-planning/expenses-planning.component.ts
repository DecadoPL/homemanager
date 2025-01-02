import { Component, OnInit } from '@angular/core';
import { ExpenseCategoryMONGO } from 'src/app/models/expenses/expenseCategoryMONGO.model';
import { ExpenseCategoryService } from 'src/app/services/expenseCategory.service';

@Component({
  selector: 'app-expenses-planning',
  templateUrl: './expenses-planning.component.html',
  styleUrls: ['./expenses-planning.component.scss'],
})
export class ExpensesPlanningComponent  implements OnInit {

  $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $expenseCategories!: ExpenseCategoryMONGO[];

  constructor(private expensesCategoryService: ExpenseCategoryService) { }

  ngOnInit() {
    this.expensesCategoryService.getExpenseCategoriesMONGO().subscribe(
      (expenseCategoriesFetched: ExpenseCategoryMONGO[]) => {
        this.$expenseCategories = expenseCategoriesFetched;
      }
    )
  }

}
