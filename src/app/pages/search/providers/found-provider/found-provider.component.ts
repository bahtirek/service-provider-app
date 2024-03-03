import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { ProviderDetailsComponent } from '../../../../components/provider/provider-details/provider-details.component';
import { Provider } from '../../../../shared/interfaces/provider.interface';
import { ProviderService } from '../../../../shared/services/provider.service';
import { NavigationService } from '../../../../shared/services/navigation.service';

@Component({
  selector: 'app-found-provider',
  standalone: true,
  imports: [ProviderDetailsComponent, BackButtonComponent],
  templateUrl: './found-provider.component.html',
  styleUrl: './found-provider.component.scss'
})
export class FoundProviderComponent {
  private providerService = inject(ProviderService);
  private navigation = inject(NavigationService);

  providerProfileDetails: Provider = {};

  ngOnInit(){
    this.getProviderDetails();
  }

  getProviderDetails(){
    const provider = this.providerService.getProvider();
    if(!provider) this.navigation.back();
    const providerId = provider.providerId!;
    this.providerService.getProviderProfileDetailsById(providerId).subscribe({
      next: (response) => {
        this.providerProfileDetails = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
