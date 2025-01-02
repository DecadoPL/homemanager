import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pdfjsLib from 'pdfjs-dist';
import { ExpenseCategoryMONGO } from 'src/app/models/expenses/expenseCategoryMONGO.model';
import { ExpenseFromPDF } from 'src/app/models/expenses/expenseFromPDF.model';
import { ExpenseTargetMONGO } from 'src/app/models/expenses/expenseTargetMONGO.model';
import { ExpenseCategoryService } from 'src/app/services/expenseCategory.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ExpenseTargetService } from 'src/app/services/expenseTarget.service';
import { ToastService } from 'src/app/services/toastService.service';

@Component({
  selector: 'app-expenses-load-from-file',
  templateUrl: './expenses-load-from-file.component.html',
  styleUrls: ['./expenses-load-from-file.component.scss'],
})
export class ExpensesLoadFromFileComponent  implements OnInit {
  // defaultFilePath = 'assets/Wyciag_11_62102025280000040202823581_20241112628410922.pdf'
  defaultFilePath = 'assets/Wyciag_11_40102018110000030203880481_20241104628737450.pdf'

  @Input() message!: string;
  @Output() loadFromFileCancel = new EventEmitter<void>();
  @Output() loadFromFileConfirm = new EventEmitter<void>();
  $expensesFromPdf: ExpenseFromPDF[] = [];
  $expensesForm!: FormGroup;
  $isFormValid: boolean = false;
  $fileHasBeenLoaded: boolean = false;
  $expenseCategories: ExpenseCategoryMONGO[] = [];
  $expenseTargets: ExpenseTargetMONGO[] = [];
  $currentExpenseIndex = 0;
  $isTargetPopupVisible = false;
  $targetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseCategoryService: ExpenseCategoryService,
    private expenseTargetService: ExpenseTargetService,
    private expensesService: ExpensesService,
    private http: HttpClient,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs';

    this.$expensesForm = this.fb.group({
      expenses: this.fb.array([]),
    });

    this.$targetForm = this.fb.group({
      _id: undefined,
      expenseTargetName: ['', Validators.required],
      expenseBankTargetName: ['', Validators.required],
      expenseTargetCategory: [undefined, Validators.required]
    });

    this.expenseCategoryService.getExpenseCategoriesMONGO().subscribe(
      (expenseCategoriesFetched) => {
        this.$expenseCategories = expenseCategoriesFetched;
      }
    )

    this.expenseTargetService.getExpenseTargetsMONGO().subscribe(
      (expenseTargetsFetched) => {
        this.$expenseTargets = expenseTargetsFetched;
      }
    )

    // this.loadDefaultPdf();

  }

  showPopup(): void {
    this.$isTargetPopupVisible = true;
    const expenseTarget =  this.expenses.at(this.$currentExpenseIndex).get('expenseTarget')?.value
    const expenseCategory =  this.expenses.at(this.$currentExpenseIndex).get('expenseCategory')?.value

    if(expenseTarget._id){
      this.$targetForm.patchValue({
        _id: expenseTarget._id,
        expenseTargetName: expenseTarget.expenseTargetName,
        expenseBankTargetName: expenseTarget.expenseBankTargetName,
      })
    }

    if(expenseCategory){
      this.$targetForm.patchValue({
        expenseTargetCategory: expenseCategory
      })
    }else{
      this.$targetForm.patchValue({
        expenseTargetCategory: undefined
      })
    }
  }

  cancelPopup(): void {
    this.$isTargetPopupVisible = false;
  }

  saveTarget(): void {
    if (this.$targetForm.valid) {
      const newTarget = this.$targetForm.value;
      console.log(newTarget)
      this.expenseTargetService.saveExpenseTargetMONGO(newTarget)
      .subscribe({
        next: (response) => {
          this.toastService.showToast(response.message, 'success');
        },
        error: (error) => {
          let errMessage = error.toString();
          this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
        }
      })
      
      this.$isTargetPopupVisible = false;
      this.$targetForm.reset();

      this.expenseCategoryService.getExpenseCategoriesMONGO().subscribe(
        (expenseCategoriesFetched) => {
          this.$expenseCategories = expenseCategoriesFetched;
        }
      )

      this.expenseTargetService.getExpenseTargetsMONGO().subscribe(
        (expenseTargetsFetched) => {
          this.$expenseTargets = expenseTargetsFetched;
        }
      )
    
    } else {
      this.toastService.showToast("Target form is invalid", 'danger');
      console.log(this.$targetForm.value)
    }
  }

  
  nextExpense(): void {
    if (this.$currentExpenseIndex < this.expenses.length-1) {
        this.$currentExpenseIndex++;
    }
  }

  previousExpense(): void {
    if (this.$currentExpenseIndex > 0) {
        this.$currentExpenseIndex--;
    }
  }

  onScroll(event: WheelEvent): void {
    // if (event.deltaY > 0) {
    //   this.nextExpense();
    // } else {
    //   this.previousExpense();
    // }
  }

  get expenses(): FormArray {
    return this.$expensesForm.get('expenses') as FormArray;
  }

  submitExpense(expense: any){
    console.log(expense)
    this.expensesService.saveExpenseMONGO(expense)
    .subscribe({
      next: (response) => {
        this.toastService.showToast('Operation successful!', 'success');
      },
      error: (error) => {
        let errMessage = error.toString();
        this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
      }
    })
  }

  compareID(id1: any, id2: any): boolean {
    return id1 && id2 ? id1._id === id2._id : id1 === id2;
  }

  addExpense(expenseFromPdf?: ExpenseFromPDF) {
    const newExpense = this.fb.group({
      _id: undefined,
      expenseName: [undefined],
      expenseCode: [expenseFromPdf?.id],
      expenseCategory: [undefined, Validators.required],
      expenseType: "Real",
      expenseDate: [expenseFromPdf?.date, Validators.required],
      expenseTarget: [undefined, Validators.required],
      expenseValue: [undefined, Validators.required]
    })
    
    this.expenses.push(newExpense);

    newExpense.statusChanges.subscribe(status => {
      if(status === 'VALID'){
        this.submitExpense(newExpense.value)
      }
    });

    const matchingControl = this.expenses.controls.find(control => {
      return control.get('expenseDate')?.value === expenseFromPdf!.date;
    });

    if (matchingControl) {
      matchingControl?.patchValue({
        expenseDate: this.formatDate(matchingControl.get('expenseDate')?.value),//początkowo zapisana w formularzu wartość ma niewłaściwy format żeby ułatwić porównywanie z plikiem PDF. DOpiero tutaj jest to konwertowane i wpisywane jak należy
        expenseTarget: this.expenseTargetProposition(expenseFromPdf!.location),
        expenseCategory: this.expenseCategoryProposition(expenseFromPdf!.location),
        expenseValue: this.convertStringToNumber(expenseFromPdf!.value.replace(' ', ''))
      });
    } 
  }

  expenseTargetProposition(operationLocation: string){
    const target = this.$expenseTargets.find(x => operationLocation.includes(x.expenseBankTargetName))
    if(target){
      return ({
        _id: target?._id,
        expenseTargetName: target?.expenseTargetName,
        expenseBankTargetName: target?.expenseBankTargetName,
        expenseTargetCategory: target?.expenseTargetCategory
      })
    }else{
      return undefined
    }
  }

  expenseCategoryProposition(operationLocation: string){
    const target = this.$expenseTargets.find(x => operationLocation.includes(x.expenseBankTargetName))

    let expenseCategory = ({
          _id: "",
          expenseCategoryName: "",
        })

    if(target){
      if(target.expenseTargetCategory){
        expenseCategory = ({
          _id: target.expenseTargetCategory._id ?? "",
          expenseCategoryName: target?.expenseTargetCategory.expenseCategoryName ?? "",
        })

        return expenseCategory
      }
    }
    return undefined
  }

  convertStringToNumber(input: string): number {
    const normalizedInput = input.replace(/\s+/g, '').replace(',', '.');
    const numberValue = parseFloat(normalizedInput);

    if (isNaN(numberValue)) {
        throw new Error(`Nieprawidłowy format liczby: ${input}`);
    }

    return numberValue;
  }

  private formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      // Split the date string and rearrange it into a valid format
      const [day, month, year] = date.split('.');
      if (!day || !month || !year) {
        throw new Error(`Invalid date string format: ${date}`);
      }
      date = `${year}-${month}-${day}`; // Convert to ISO format
    }
  
    const d = new Date(date);
  
    if (isNaN(d.getTime())) {
      throw new Error(`Invalid date provided after conversion: ${date}`);
    }
  
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Zero-pad
    const day = String(d.getDate()).padStart(2, '0'); // Zero-pad
  
    return `${year}-${month}-${day}`;
  }
 
  onLoadCancel(){
    this.loadFromFileCancel.emit();
  }

  onLoadConfirm(){
    this.loadFromFileConfirm.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.loadPdf(reader.result as ArrayBuffer);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  private loadDefaultPdf(): void {
    this.http.get(this.defaultFilePath, { responseType: 'arraybuffer' }).subscribe({
      next: (data) => {
        this.loadPdf(data);
        this.$fileHasBeenLoaded = true;
        this.toastService.showToast('File has been loaded successfully', 'success');
      },
      error: (err) => {
        this.toastService.showToast('Error loading file', 'danger');
        console.log("Error loading file", err)
      },
    });
  }

  loadPdf(arrayBuffer: ArrayBuffer): void {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

    loadingTask.promise
      .then((pdf) => {
        this.$fileHasBeenLoaded = true;
        this.toastService.showToast('File has been loaded successfully', 'success');
        this.extractOperationsFromPdf(pdf);
      })
      .catch((error) => {
        this.toastService.showToast('Error loading file', 'danger');
        console.log("Error loading file", error)
      });
  }

  async extractOperationsFromPdf(pdf: any): Promise<void> {
    // Process each page in the PDF
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
  
      // Process each text item in the page content
      for (let j = 0; j < textContent.items.length; j++) {
        const currentItem = textContent.items[j];
        if (currentItem.str === "") {
          for (let k = j + 1; k < textContent.items.length; k++) {
            const nextItem = textContent.items[k];
  
            if (nextItem.str === "") {
              break; // Exit loop if encountering another empty string
            }
  
            if (nextItem.str.length === 17 && !nextItem.str.includes(" ")) {
              // Construct the transaction object
              const expense: ExpenseFromPDF = {
                date: textContent.items[k - 2]?.str || "",
                id: nextItem.str,
                type: textContent.items[k + 2]?.str || "",
                value: textContent.items[k + 4]?.str || "",
                description: textContent.items[k + 9]?.str || "",
                location: "",
              };
  
              // Append additional description if the condition is met
              if (expense.type === "PŁATNOŚĆ WEB - KOD MOBILNY") {
                expense.description += " " + (textContent.items[k + 11]?.str || "");
              }
  
              // Extract location
              expense.location = this.extractLocationFromDescription(expense.description);
  
              // Add the transaction to the list
              this.$expensesFromPdf.push(expense);
              this.addExpense(expense);
  
              break; // Exit inner loop as the transaction is found
            }
          }
        }
      }
    }
  }
  // Extract location text based on patterns
  extractLocationFromDescription(input: string): string {
    const match = input.match(/Lokalizacja:\s*(.*?)\s*(Nr ref|$)/);
    return match ? match[1] : ""; // Return matched text or empty string
  }

}
