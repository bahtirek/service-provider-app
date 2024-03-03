import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from '../../shared/services/chat.service';
import { Provider } from '../../shared/interfaces/provider.interface';
import { ProviderService } from '../../shared/services/provider.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-client-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './client-shell.component.html',
  styleUrl: './client-shell.component.scss'
})
export class ClientShellComponent implements OnInit {
  private chatService = inject(ChatService);
  private providerService = inject(ProviderService);

  providers: Provider[] = [];

  ngOnInit(){
    if (this.providerService.providers.length > 0) return;
    this.providerService.providersSource.pipe(take(1)).subscribe(providers => {
      this.providers = providers;
    })
    this.providerService.setMyProviders();
    this.chatService.connect();
  }
}
