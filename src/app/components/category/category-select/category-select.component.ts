import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProviderProfileService } from '../../../pages/provider/provider-profile.service';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss'
})
export class CategorySelectComponent {
  private providerService = inject(ProviderProfileService);
  allCategorys: ServiceCategory[] = [];
  category: number | null = null;
  nullValue: null = null;

  ngOnInit(){
    this.getCategory()
  }

  @Input() set category$ (value: number){
    if(value && value > 0) this.category = value
  }

  @Output() onCategorySelect = new EventEmitter<number>();

  getCategory() {
    this.allCategorys = this.providerService.allCategorys;
    console.log(this.allCategorys);

    if(this.allCategorys && this.allCategorys.length > 0) return;
    this.providerService.getCategory().subscribe({
      next:(response: any) => {
        this.allCategorys = response;
        this.providerService.allCategorys = response
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onSelect(value: any){
    if(value) this.onCategorySelect.emit(value)
  }

}
