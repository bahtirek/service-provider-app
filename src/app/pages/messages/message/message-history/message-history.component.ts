import { Component, Input } from '@angular/core';
import { MessageHistory } from '../../../../shared/interfaces/message-history.inteface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message-history.component.html',
  styleUrl: './message-history.component.scss'
})
export class MessageHistoryComponent {
  showMessageHistory: boolean = false;

  @Input() messageHistory: MessageHistory[] = [];

  onMessageHistoryClick(){
    console.log('edi');
    this.showMessageHistory = !this.showMessageHistory
  }
}
