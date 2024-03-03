import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';
import { ClientService } from '../../../shared/services/client.service';
import { EnevelopeComponent } from '../../enevelope/enevelope.component';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [EnevelopeComponent],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
  private clientService = inject(ClientService)
  clientDetails: Client = {};

  @Input() set client (value: Client) {
    this.clientDetails = value;
  }

  @Output() cardClickled: EventEmitter<Client> = new EventEmitter();

  cardClicked() {
    this.cardClickled.emit(this.clientDetails);
  }
}
