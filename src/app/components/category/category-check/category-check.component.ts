import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProviderProfileService } from '../../../pages/provider/provider-profile.service';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-check',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './category-check.component.html',
  styleUrl: './category-check.component.scss'
})
export class CategoryCheckComponent {
  private providerService = inject(ProviderProfileService);
  allCategorys: ServiceCategory[] = [];
  categorys: any[] = [];
  detailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      category: this.fb.array([])
    });
    this.detailsForm.controls['category'].valueChanges.subscribe(() => {
      this.onCategoryCheck.emit(this.filterCategorys());
    })
  }

  ngOnInit(){
    this.getCategory()
  }

  @Output() onCategoryCheck = new EventEmitter<number[]>();

  get category() { return this.detailsForm.get('category') as FormArray; }

  getCategory() {
    this.providerService.getCategory().subscribe({
      next:(response: any) => {
        this.allCategorys = response;
        this.setCategorys();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  setCategorys() {
    this.category.clear();

    this.allCategorys.forEach(category => {
      const categoryControl = this.fb.group ({
        lkCategoryId: [category.lkCategoryId],
        categoryCheck: [false],
      })
      this.category.push(categoryControl);
    })
  }

  filterCategorys() {
    return this.category.value.reduce((filtered: number[], category: ServiceCategory) => {
      if (category.categoryCheck === true) {
        filtered.push(category.lkCategoryId);
      }
      return filtered;
    }, []);
  }
}
