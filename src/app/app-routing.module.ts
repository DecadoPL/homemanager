import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredientListComponent } from './components/ingredient/ingredient-list/ingredient-list.component';
import { IngredientDetailsComponent } from './components/ingredient/ingredient-details/ingredient-details.component';
import { SharedManagementComponent } from './components/shared-management/shared-management.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishDetailsComponent } from './components/dish/dish-details/dish-details.component';
import { DietListComponent } from './components/diet/diet-list/diet-list.component';
import { DietDetailsComponent } from './components/diet/diet-details/diet-details.component';
import { DietDishDetailsComponent } from './components/diet/diet-dish-details/diet-dish-details.component';
import { ShoppingListDetailsComponent } from './components/shopping-list/shopping-list-details/shopping-list-details.component';
import { ShoppingListListComponent } from './components/shopping-list/shopping-list-list/shopping-list-list.component';
import { DietRequirementsListComponent } from './components/dietRequirements/diet-requirements-list/diet-requirements-list.component';
import { DietRequirementsDetailsComponent } from './components/dietRequirements/diet-requirements-details/diet-requirements-details.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { ExpensesListComponent } from './components/expenses/expenses-list/expenses-list.component';
import { ExpensesDetailsComponent } from './components/expenses/expenses-details/expenses-details.component';
import { ExpensesPlanningComponent } from './components/expenses/expenses-planning/expenses-planning.component';

const routes: Routes = [
  
  { path: 'ingredients', component: IngredientListComponent},
  { path: 'ingredients/new', component: IngredientDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'ingredients/:id', component: IngredientDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'sharedManagement', component: SharedManagementComponent},

  { path: 'dishes', component: DishListComponent},
  { path: 'dishes/new', component: DishDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'dishes/:id', component: DishDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'diets', component: DietListComponent},
  { path: 'diets/new', component: DietDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'diets/copy/:dietId', component: DietDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'diets/:dietId', component: DietDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'diets/:dietId/:dayId/:dishId', component: DietDishDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'shoppingList', component: ShoppingListListComponent},
  { path: 'shoppingList/new', component: ShoppingListDetailsComponent},
  { path: 'shoppingList/:id', component: ShoppingListDetailsComponent},
 
  { path: 'dietRequirements', component: DietRequirementsListComponent},
  { path: 'dietRequirements/new', component: DietRequirementsDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'dietRequirements/:id', component: DietRequirementsDetailsComponent, canDeactivate: [CanDeactivateGuardService]},

  { path: 'expenses', component: ExpensesListComponent},
  { path: 'expenses/new', component: ExpensesDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'expenses/planning', component: ExpensesPlanningComponent, canDeactivate: [CanDeactivateGuardService]},
  { path: 'expenses/:id', component: ExpensesDetailsComponent, canDeactivate: [CanDeactivateGuardService]},
  

  { path: '', component: HomeComponent ,pathMatch: 'full'},
  { path: '**', component: HomeComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
