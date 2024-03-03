import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ProviderService } from '../../../shared/services/provider.service';
import { EnevelopeComponent } from '../../enevelope/enevelope.component';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [EnevelopeComponent],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {
  providerDetails: Provider = {};

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
  }

  @Output() cardClickled: EventEmitter<Provider> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.providerDetails);
  }
}
