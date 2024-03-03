import { Component, OnInit, inject } from '@angular/core';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderService } from '../../../shared/services/provider.service';
import { ProviderSearchComponent } from '../../../components/provider/provider-search/provider-search.component';
import { ProviderListComponent } from '../../../components/provider/provider-list/provider-list.component';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProviderListComponent, ProviderSearchComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private providerService = inject(ProviderService);

  providers: Provider[] = [];

  ngOnInit(){
    this.providers = this.providerService.providers;
    if (this.providers.length > 0) return;
    this.providerService.providersSource.pipe(take(1)).subscribe(providers => {
      this.providers = providers;
    })
  }

  cardClicked(provider: Provider){
    this.providerService.saveProviderToLocal(provider)
    this.router.navigate([`/client/my-provider`]);
  }
}
