import { Injectable, computed, inject, signal } from '@angular/core';
//import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Provider } from 'src/app/shared/interfaces/provider.interface';
import { Success } from 'src/app/shared/interfaces/success.interface';
////import { Provider } from '../../shared/interfaces/provider.interface';
//import { Success } from '../../shared/interfaces/success.interface';


@Injectable({
  providedIn: 'root',
})

export class ProviderProfileService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  allCategorys: any;

  getWeekDays() {
    return this.http.get(this.url + '/providers/lk-week-days');
  }
  getWorkHours() {
    return this.http.get(this.url + '/providers/lk-work-hours');
  }
  getCategory() {
    return this.http.get(this.url + '/providers/lk-category');
  }

  postProviderProfileDetails(providerProfileDetails: Provider) {
    return this.http.post<Success>(this.url + '/providers/details', providerProfileDetails);
  }

  getProviderProfileDetails() {
    return this.http.get(this.url + '/providers/details');
  }
}
