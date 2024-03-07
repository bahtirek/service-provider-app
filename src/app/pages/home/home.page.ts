import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonRow, IonCol, IonText, IonLabel, IonGrid, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { optionsOutline, searchOutline } from 'ionicons/icons';
import { IonicSlides } from '@ionic/angular'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Provider } from 'src/app/shared/interfaces/provider.interface';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProviderListComponent } from 'src/app/components/provider/provider-list/provider-list.component';
import { ProviderSearchComponent } from 'src/app/components/provider/provider-search/provider-search.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonGrid, IonButtons, IonTitle, IonContent, IonButton, IonIcon, IonRow, IonCol, IonText, IonLabel, IonSearchbar, FormsModule, HeaderComponent, MenuComponent, ProviderListComponent, ProviderSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  private router = inject(Router);
  private providerService = inject(ProviderService);
  private auth = inject(AuthService);
  searchKeyword: string = "";
  popular: any[] = [];
  providers: Provider[] = [];
  searched: boolean = false;
  results: boolean =  false;

  swiperModules = [IonicSlides]
  constructor() {
    addIcons({optionsOutline, searchOutline})
  }

  ngOnInit(): void {
    this.popular = [
      {id: 1, title: 'title 1', description: 'description'},
      {id: 2, title: 'title 2', description: 'description'},
      {id: 3, title: 'title 3', description: 'description'},
      {id: 4, title: 'title 4', description: 'description'},
    ]
  }

  foundProviders(searchResults: any){
    this.providerService.foundProviders = searchResults.providers;
    this.providerService.searchDetails = searchResults.searchDetails;
    this.providers = searchResults.providers;
    this.searched = true;
    this.results = false;
    //this.providerService.searchDetails = undefined;
  }

  cardClicked(provider: Provider){
    this.providerService.saveProviderToLocal(provider);
    if(this.auth.user().user?.isClient) {
      this.router.navigate([`/client/my-provider`]);
    } else {
      this.router.navigate([`/search/found-provider`]);
    }
  }
}
