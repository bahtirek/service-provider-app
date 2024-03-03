import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderSearchComponent } from '../../../components/provider/provider-search/provider-search.component';
import { ProviderListComponent } from '../../../components/provider/provider-list/provider-list.component';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderService } from '../../../shared/services/provider.service';
import {Location} from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [ProviderListComponent, ProviderSearchComponent],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private providerService = inject(ProviderService);
  private location = inject(Location);
  private auth = inject(AuthService);

  user = this.auth.user;
  providers: Provider[] = [];
  searched: boolean = false;
  results: boolean =  false;

  ngOnInit(){
    this.results = this.route.snapshot.paramMap.get('results') ? true : false;
    if(this.results) {
      this.providers = this.providerService.foundProviders;
      this.location.replaceState("/search/providers");
    } else {
      this.providers = this.providerService.foundProviders;
    }
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
