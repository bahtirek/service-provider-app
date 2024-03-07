import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ProviderProfileService } from '../../../pages/provider/provider-profile.service';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-radio',
  templateUrl: './category-radio.component.html',
  styleUrls: ['./category-radio.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule],
})
export class CategoryRadioComponent  implements OnInit {

  private providerService = inject(ProviderProfileService);
  allCategorys: ServiceCategory[] = [];
  public categoryId?: number;


  ngOnInit(){
    this.getCategory()
  }

  @Output() categoryCheckEmit = new EventEmitter<number>();

  getCategory() {
    this.providerService.getCategory().subscribe({
      next:(response: any) => {
        this.allCategorys = response;

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  emitProviders(){
    this.categoryCheckEmit.emit(this.categoryId);
  }
}
