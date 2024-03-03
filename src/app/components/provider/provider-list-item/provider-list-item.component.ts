import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Provider } from '../../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-list-item',
  standalone: true,
  imports: [],
  templateUrl: './provider-list-item.component.html',
  styleUrl: './provider-list-item.component.scss'
})
export class ProviderListItemComponent {
  providerDetails: Provider = {};

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
  }

  @Output() cardClickled: EventEmitter<Provider> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.providerDetails);
  }
}
