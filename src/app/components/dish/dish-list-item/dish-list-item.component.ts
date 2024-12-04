import { Component, Input } from '@angular/core';
import { DishListItemMONGO } from 'src/app/models/dish/dishListItemMONGO.model';


@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent {
  @Input() dish!: DishListItemMONGO;
  @Input() index!: string;

  
}
