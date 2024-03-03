import { Component, Input, SimpleChange, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Provider } from '../../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.scss'
})
export class ProviderDetailsComponent {
  private auth = inject(AuthService);
  providerDetails: Provider = {};
  providerProfileDetails: Provider = {};
  showDetails: boolean = true;

  @Input() set showCompleteDetails (value: boolean) {
    this.showDetails = value
  }

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
  }

  @Input() set providerProfile (value: Provider) {
    this.providerProfileDetails = value;
  }

  @Input() hideMoreButton: boolean = false;

  ngOnInit(){
    this.checkIfClient()
  }

  ngOnChanges(changes: SimpleChange){
    console.log(changes);
    console.log(this.providerProfileDetails);


  }
  more(){
    this.showDetails = !this.showDetails
  }

  checkIfClient() {
    if(this.auth.user()?.user?.isClient) {
      /**
       *  get Subjects
       *  if subjects this.showProviderFullDetails = false;
       *
       */
    }
  }

  cardClicked() {

  }
}
