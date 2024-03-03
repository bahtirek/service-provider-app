import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-provider-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './provider-shell.component.html',
  styleUrl: './provider-shell.component.scss'
})
export class ProviderShellComponent implements OnInit {
  private chatService = inject(ChatService);

  ngOnInit(){
    this.chatService.connect();
  }
}
