import { Component, Input } from '@angular/core';
import { ExpenseListItemMONGO } from 'src/app/models/expenses/expenseListItemMONGO.model';

@Component({
  selector: 'app-expenses-list-item',
  templateUrl: './expenses-list-item.component.html',
  styleUrls: ['./expenses-list-item.component.scss'],
})
export class ExpensesListItemComponent   {
  @Input() expense!: ExpenseListItemMONGO;
  @Input() index!: string;

}
