import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProviderService } from '../../../shared/services/provider.service';
import { FormErrorComponent } from '../../../shared/form-helpers/form-error/form-error.component';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { CategorySelectComponent } from '../../category/category-select/category-select.component';
import { CategoryCheckComponent } from '../../category/category-check/category-check.component';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonTitle } from "@ionic/angular/standalone";
import { ModalComponent } from '../../modal/modal.component';
import { addIcons } from 'ionicons';
import { optionsOutline, searchOutline } from 'ionicons/icons';


@Component({
  selector: 'app-provider-search',
  standalone: true,
  imports: [IonGrid, IonButtons, IonTitle, IonContent, IonButton, IonIcon, IonRow, IonCol, FormErrorComponent, FormsModule, CategorySelectComponent, CategoryCheckComponent, ModalComponent],
  templateUrl: './provider-search.component.html',
  styleUrl: './provider-search.component.scss'
})
export class ProviderSearchComponent {
  private providerService = inject(ProviderService);
  searchKeyword: string = "";
  errorMessage: string = "";
  category: any | null = null;
  toggleModal: boolean = false;

  //@Input() searchPage: boolean = true;

  @Output() foundProviders: EventEmitter<any> = new EventEmitter();

  constructor() {
    addIcons({optionsOutline, searchOutline})
  }

  ngOnInit() {
    this.setSearchDetailsIsExists()
  }

  searchProviders() {
    let category = null;
    const searchKeyword = this.searchKeyword.trim();

    if (!searchKeyword && (!this.category || this.category == 'null')) return;

    if(this.category) category = parseInt(this.category);

    const searchDetails = {
      lkCategoryId: parseInt(this.category),
      searchKeyword: searchKeyword
    }

    this.providerService.providerSearch(searchDetails).subscribe({
      next: (providers: Provider[]) => {
        this.foundProviders.emit({providers: providers, searchDetails: searchDetails})
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setSearchDetailsIsExists(){
    if(this.providerService.searchDetails) {
      this.searchKeyword = this.providerService?.searchDetails?.searchKeyword
      this.category = this.providerService?.searchDetails?.lkCategoryId
      this.providerService.searchDetails.searchKeyword = '';
      this.providerService.searchDetails.lkCategoryId = null;
    }
  }

  onCategoryCheckEmit(categoryId: number[]) {
    this.category = categoryId;
    this.toggleModal = false;
  }

  showCategoryList(){
    this.toggleModal = !this.toggleModal;
  }
}

