import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toastService.service';
import { catchError, map } from 'rxjs';
import { IngredientListItemMONGO } from 'src/app/models/ingredient/ingredientListItemMONGO';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit{
  $ingredients!: IngredientListItemMONGO[];
  ingredientsToDisplay!: IngredientListItemMONGO[];
  alertMsg!: string;
  alert: boolean = false;
  itemId!: string;
  searchText!: string;

  constructor(private ingredientService: IngredientService,
              private toastService: ToastService){}

  ngOnInit(){
    this.loadIngredientsList();
  }

  deleteItem(id: string) {
    this.alertMsg = "Do you want to delete?"
    this.alert = true;
    this.itemId = id;
  }

  deleteCancel(){
    this.alert = false;
  }
  deleteConfirm(){
    this.ingredientService.deleteIngredientMONGO(this.itemId)
    .subscribe({
      next: (response) => {
        this.toastService.showToast(response.message, 'success');
        this.alert=false;
        this.loadIngredientsList();
      },
      error: (error) => {
        let errMessage = error.toString()
        this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
        this.alert=false;
        this.loadIngredientsList();
      }
    });  
  }

  loadIngredientsList(){
    this.ingredientService.getIngredientsListMONGO()
    .subscribe((ingredientsList: IngredientListItemMONGO[]) => {
      this.$ingredients = ingredientsList.sort((a,b) => {
        return a.ingrName.localeCompare(b.ingrName);
      });
      this.ingredientsToDisplay = this.$ingredients;
    })
  }

  onSearch(){
    if(this.searchText!=null){
      this.ingredientsToDisplay = this.$ingredients.filter(item => item.ingrName.toLowerCase().includes(this.searchText));
    }else{
      this.ingredientsToDisplay = this.$ingredients;
    }
    
  }
}
