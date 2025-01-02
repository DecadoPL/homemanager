import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule,} from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DietDishCardComponent } from './components/diet/diet-dish-card/diet-dish-card.component';
import { DishDetailsComponent } from './components/dish/dish-details/dish-details.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { HomeComponent } from './components/home/home.component';
import { DietDetailsComponent } from './components/diet/diet-details/diet-details.component';
import { IngredientDetailsComponent } from './components/ingredient/ingredient-details/ingredient-details.component';
import { IngredientListComponent } from './components/ingredient/ingredient-list/ingredient-list.component';
import { IngredientListItemComponent } from './components/ingredient/ingredient-list-item/ingredient-list-item.component';
import { DietListComponent } from './components/diet/diet-list/diet-list.component';
import { DietListItemComponent } from './components/diet/diet-list-item/diet-list-item.component';
import { DishListItemComponent } from './components/dish/dish-list-item/dish-list-item.component';
import { DietDishDetailsComponent } from './components/diet/diet-dish-details/diet-dish-details.component';
import { AlertComponent } from './components/alert/alert.component';
import { SharedManagementComponent } from './components/shared-management/shared-management.component';
import { DietRequirementsDetailsComponent } from './components/dietRequirements/diet-requirements-details/diet-requirements-details.component';
import { DietRequirementsListComponent } from './components/dietRequirements/diet-requirements-list/diet-requirements-list.component';
import { DietRequirementsListItemComponent } from './components/dietRequirements/diet-requirements-list-item/diet-requirements-list-item.component';
import { DietDishesTrayComponent } from './components/diet/diet-dishes-tray/diet-dishes-tray.component';
import { DietDishesTrayCardComponent } from './components/diet/diet-dishes-tray-card/diet-dishes-tray-card.component';
import { ShoppingListDetailsComponent } from './components/shopping-list/shopping-list-details/shopping-list-details.component';
import { ShoppingListListComponent } from './components/shopping-list/shopping-list-list/shopping-list-list.component';
import { ShoppingListListItemComponent } from './components/shopping-list/shopping-list-list-item/shopping-list-list-item.component';
import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe, JsonPipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DishService } from './services/dish.service';
import { IngredientService } from './services/ingredient.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { DietService } from './services/diet.service';
import { PortionNameService } from './services/portionName.service';
import { DietRequirementsService } from './services/dietRequirements.service';
import { ShoppingListService } from './services/shoppingList.service';
import { ExpensesDetailsComponent } from './components/expenses/expenses-details/expenses-details.component';
import { ExpensesListComponent } from './components/expenses/expenses-list/expenses-list.component';
import { ExpensesListItemComponent } from './components/expenses/expenses-list-item/expenses-list-item.component';
import { ExpensesService } from './services/expenses.service';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseCategoryService } from './services/expenseCategory.service';
import { ExpenseTargetService } from './services/expenseTarget.service';
import { ExpensesPlanningComponent } from './components/expenses/expenses-planning/expenses-planning.component';
import { ExpensesLoadFromFileComponent } from './components/expenses/expenses-load-from-file/expenses-load-from-file.component';


@NgModule({
  declarations: [
    AppComponent,
    DietDishCardComponent,
    DishDetailsComponent,
    DishListComponent,
    HomeComponent,
    DietDetailsComponent,
    IngredientDetailsComponent,
    IngredientListComponent,
    IngredientListItemComponent,
    DietListComponent,
    DietListItemComponent,
    DishListItemComponent,
    DietDishDetailsComponent,
    AlertComponent,
    SharedManagementComponent,
    DietRequirementsDetailsComponent,
    DietRequirementsListComponent,
    DietRequirementsListItemComponent,
    DietDishesTrayComponent,
    DietDishesTrayCardComponent,
    ShoppingListDetailsComponent,
    ShoppingListListComponent,
    ShoppingListListItemComponent,
    DeleteAlertComponent,
    ExpensesDetailsComponent,
    ExpensesListComponent,
    ExpensesListItemComponent,
    ExpensesPlanningComponent,
    ExpensesLoadFromFileComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DragDropModule, 
    HttpClientModule,
    NgbDatepickerModule, 
    NgbAlertModule, 
    JsonPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 5 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    DishService,
    IngredientService, 
    DietService, 
    CanDeactivateGuardService,
    PortionNameService,
    DatePipe,
    DietRequirementsService,
    ShoppingListService,
    ExpensesService,
    ExpenseCategoryService,
    ExpenseTargetService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
