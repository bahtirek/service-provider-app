import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-helpers/form-error/form-error.component';
import { ProviderProfileService } from '../provider-profile.service';
import { WeekDay } from '../../../shared/interfaces/week-day.interface';
import { NgFor } from '@angular/common';
import { WorkHour } from '../../../shared/interfaces/work-hour.interface';
import { Success } from '../../../shared/interfaces/success.interface';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent, NgFor],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
  private router = inject(Router);
  private providerService = inject(ProviderProfileService);

  weekDays: WeekDay[] = [];
  detailsForm: FormGroup;
  validate: boolean = false;
  validateConfirmPassword: boolean = false;
  workHoursArray: WorkHour[] = [];
  allCategorys: ServiceCategory[] = [];
  categoryErrorMessage: string = '';
  weekdaysErrorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      companyName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      description: ['', [Validators.required]],
      workHours: this.fb.group({
        fromWorkHourId: ['', Validators.required],
        toWorkHourId: ['', Validators.required]
      }),
      availableDays: this.fb.array([]),
      category: this.fb.array([])
    });
  }

  ngOnInit() {
    this.getWeekDays();
    this.getWorkHours();
    this.getCategory();
  }

  get companyName() { return this.detailsForm.get('companyName'); }
  get address() { return this.detailsForm.get('address'); }
  get phoneNumber() { return this.detailsForm.get('phoneNumber'); }
  get description() { return this.detailsForm.get('description'); }
  get fromWorkHourId() { return this.detailsForm.get('workHours.fromWorkHourId'); }
  get toWorkHourId() { return this.detailsForm.get('workHours.toWorkHourId'); }
  get workHours() { return this.detailsForm.get('workHours'); }
  get availableDays() { return this.detailsForm.get('availableDays') as FormArray; }
  get category() { return this.detailsForm.get('category') as FormArray; }

  setAvailableDays() {
    this.availableDays.clear();

    this.weekDays.forEach(day => {
      const weekDayControl = this.fb.group ({
        lkWeekDayId: [day.lkWeekDayId],
        weekDayCheck: [false],
      })
      this.availableDays.push(weekDayControl);
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

  getWeekDays() {
    this.providerService.getWeekDays().subscribe({
      next:(response: any) => {
        this.weekDays = response;

        this.setAvailableDays()
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getWorkHours() {
    this.providerService.getWorkHours().subscribe({
      next:(response: any) => {
        this.workHoursArray = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

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

  onSubmit() {
    this.validate = true;
    const isCategoryValid = this.validateCategorys();
    const isWeekdaysValid = this.validateWeekdays();
    this.arrayValidation();
    if (this.detailsForm.valid && isCategoryValid && isWeekdaysValid) {
      const form = {
        companyName: this.companyName?.value,
        address: this.address?.value,
        phoneNumber: this.phoneNumber?.value,
        description: this.description?.value,
        availableDays: this.filterWeekdays(),
        category: this.filterCategorys(),
        workHours: this.workHours?.value
      }

console.log(form);

      this.providerService.postProviderProfileDetails(form).subscribe ({
        next: (response: Success) => {
          console.log(response);
          if(response && response.success) this.router.navigate(['provider'])
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  validateCategorys() {
    if (this.filterCategorys().length > 0) {
      this.categoryErrorMessage = '';
      return true;
    }
    this.categoryErrorMessage = 'Field is required';
    return false;
  }

  validateWeekdays() {
    if (this.filterWeekdays().length > 0) {
      this.weekdaysErrorMessage = '';
      return true;
    }
    this.weekdaysErrorMessage = 'Field is required';
    return false;
  }

  filterWeekdays() {
    return this.availableDays.value.reduce((filtered: number[], day: WeekDay) => {
      if (day.weekDayCheck === true) {
        filtered.push(day.lkWeekDayId)
      }
      return filtered;
    }, []);
  }

  filterCategorys() {
    return this.category.value.reduce((filtered: number[], category: ServiceCategory) => {
      if (category.categoryCheck === true) {
        filtered.push(category.lkCategoryId);
      }
      return filtered;
    }, []);
  }

  arrayValidation() {
    this.detailsForm.controls['category'].valueChanges.subscribe(() => {

      this.validateCategorys()
    })
    this.detailsForm.controls['availableDays'].valueChanges.subscribe(() => {
      this.validateWeekdays()
    })
  }
}
