import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toastService.service';
import { DietRequirementsListItemMONGO } from 'src/app/models/diet/dietRequirementsListItemMONGO.model';
import { DietRequirementsService } from 'src/app/services/dietRequirements.service';

@Component({
  selector: 'app-diet-requirements-list',
  templateUrl: './diet-requirements-list.component.html',
  styleUrls: ['./diet-requirements-list.component.css']
})
export class DietRequirementsListComponent implements OnInit {
  $dietRequirementsList!: DietRequirementsListItemMONGO[];
  dietRequirementsToDisplay!: DietRequirementsListItemMONGO[];
  alertMsg!: string;
  alert: boolean = false;
  itemId!: string;
  searchText!: string;
  
  constructor(private dietRequirementsService: DietRequirementsService,
              private toastService: ToastService){}

  ngOnInit(){
    this.loadDietRequirementsList();
  }

  deleteItem(id: string){
    this.alertMsg = "Do you want to delete?"
    this.alert = true;
    this.itemId = id;
  }

  deleteCancel(){
    this.alert = false;
  }

  deleteConfirm(){
    this.dietRequirementsService.deleteDietRequirementsMONGO(this.itemId)
    .subscribe({
      next: (response) => {
        this.toastService.showToast(response.message, 'success');
        this.alert=false;
        this.loadDietRequirementsList();
      },
      error: (error) => {
        let errMessage = error.toString()
        this.toastService.showToast(errMessage.replace("Error: ", ""), 'danger');
        this.alert=false;
        this.loadDietRequirementsList();
      }
    });  
  }

  loadDietRequirementsList(){
    this.dietRequirementsService.getDietRequirementsListMONGO()
    .subscribe((drList: DietRequirementsListItemMONGO[]) => {
        this.$dietRequirementsList = drList.sort((a,b) => {
          return a.dietRequirementsName.localeCompare(b.dietRequirementsName);
        });
        this.dietRequirementsToDisplay = this.$dietRequirementsList;
      }
    );
  }

  onSearch(){
    if(this.searchText!=null){
      this.dietRequirementsToDisplay = this.$dietRequirementsList.filter(item => item.dietRequirementsName.toLowerCase().includes(this.searchText));
    }else{
      this.dietRequirementsToDisplay = this.$dietRequirementsList;
    }
  }
}
