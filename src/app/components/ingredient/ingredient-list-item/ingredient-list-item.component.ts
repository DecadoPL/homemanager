import { Component, Input, OnInit } from '@angular/core';
import { IngredientListItemMONGO } from 'src/app/models/ingredient/ingredientListItemMONGO';

@Component({
  selector: 'app-ingredient-list-item',
  templateUrl: './ingredient-list-item.component.html',
  styleUrls: ['./ingredient-list-item.component.css']
})
export class IngredientListItemComponent implements OnInit{
  @Input() ingredient!: IngredientListItemMONGO;
  @Input() index!: string;

  ngOnInit(){}
}
