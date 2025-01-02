import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toastService.service';
import { ExpenseCategoryMONGO } from 'src/app/models/expenses/expenseCategoryMONGO.model';
import { ExpenseTargetMONGO } from 'src/app/models/expenses/expenseTargetMONGO.model';
import { ExpenseCategoryService } from 'src/app/services/expenseCategory.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseTargetService } from 'src/app/services/expenseTarget.service';

@Component({
  selector: 'app-expenses-details',
  templateUrl: './expenses-details.component.html',
  styleUrls: ['./expenses-details.component.scss'],
})
export class ExpensesDetailsComponent  implements OnInit {
  expenseForm!: FormGroup;
  isFormValid: boolean = false;
  requireSave: boolean = false;
  alertMsg!: string;
  alert: boolean = false;
  newExpenseFlag: boolean = false;
  expenseCategories!: ExpenseCategoryMONGO[];
  expenseTargets!: ExpenseTargetMONGO[];
  today!: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private expensesService: ExpensesService,
              private toastService: ToastService,
              private expenseCategoryService: ExpenseCategoryService,
              private expenseTargetService: ExpenseTargetService,
              private fb:FormBuilder){}  

  ngOnInit() {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'

    this.expenseForm = this.fb.group({
      _id: undefined,
      expenseName: [null, Validators.required],
      expenseCategory: this.fb.group({
        _id: [null],
        expenseCategoryName: [null],
      }),
      expenseType: this.fb.group({
        _id: [null],
        expenseTypeName: [null],
      }),
      expenseDate: [null, Validators.required],
      expenseTarget: this.fb.group({
        _id: [null],
        expenseTargetName: [null, Validators.required],
        expenseBankTargetName: [null]
      }),
      expenseValue: [0, [Validators.required]],
    })

    this.expenseCategoryService.getExpenseCategoriesMONGO().subscribe(
      (expenseCategoriesFetched: ExpenseCategoryMONGO[]) => {
        this.expenseCategories = expenseCategoriesFetched;
        this.expenseForm.patchValue({
          expenseCategory: {
            _id: this.expenseCategories[0]._id,
            expenseCategoryName: this.expenseCategories[0].expenseCategoryName
          },
        });
      }
    )

    this.expenseTargetService.getExpenseTargetsMONGO().subscribe(
      (expenseTargetsFetched: ExpenseTargetMONGO[]) => {
        this.expenseTargets = expenseTargetsFetched;
      }
    )



    this.expenseForm.statusChanges.subscribe(
      (status) =>{
        if(status=="VALID"){
          this.isFormValid = true;
        }else{
          this.isFormValid = false;
        }
        this.requireSave = true;
      }
    )

    this.requireSave = false;


  }

  canExit(): Promise<boolean> {
    if (this.requireSave == false) {
      return Promise.resolve(true);
    } else {
      this.alertMsg = "Save changes or die try'n";
      this.alert = true;
      return new Promise<boolean>((resolve, reject) => {
        this.alertSave = () => {
          this.alert = false;
          this.onSubmit();
          resolve(true);
        };
        this.alertCancel = () => {
          this.alert = false;
          resolve(false);
        };
        this.alertDiscard = () => {
          this.alert = false;
          resolve(true);
        };
      });
    }
  }

  alertCancel(){}

  alertSave(){}

  alertDiscard(){}

  onSubmit(){
    console.log("this.expenseForm.value", this.expenseForm.value)
    if(this.isFormValid == true){
      console.log("this.expenseForm.value", this.expenseForm.value)
      this.expensesService.saveExpenseMONGO(this.expenseForm.value)
      .subscribe( {
        next: (response) => {
          this.toastService.showToast(response.message, 'success');
          this.requireSave = false;
        },
        error: (error) => {
          let errMessage = error.toString();
          this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
        }
      });
       this.requireSave = true;
    }
    
  }

  goUpOneLevel(){
    this.router.navigate(['expenses']);
  }

  changeSelectedExpenseCategory(event: any){
    const selectedCategoryName = event.target.value;
    const selectedCategory = this.expenseCategories.find(x => x.expenseCategoryName === selectedCategoryName)

    this.expenseForm.patchValue({
      expenseCategory: {
        _id: selectedCategory?._id,
        expenseCategoryName: selectedCategory?.expenseCategoryName,
      }
    }
    )
  }

  changeSelectedExpenseTarget(event: any){
    const selectedTargetName = event.target.value;
    const selectedTarget = this.expenseTargets.find(x => x.expenseTargetName === selectedTargetName)

    this.expenseForm.patchValue({
      expenseTarget: {
        _id: selectedTarget?._id,
        expenseTargetName: selectedTarget?.expenseTargetName,
        expenseBankTargetName: selectedTarget?.expenseBankTargetName
      }
    }
    )
  }
}
