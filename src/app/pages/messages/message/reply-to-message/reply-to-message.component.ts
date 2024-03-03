import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplyToMessage } from '../../../../shared/interfaces/reply-to-message.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { Receiver } from '../../../../shared/interfaces/receiver.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-reply-to-message',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './reply-to-message.component.html',
  styleUrl: './reply-to-message.component.scss'
})
export class ReplyToMessageComponent {

  @Input() replyToMessage?: ReplyToMessage;
  @Input() user?: User;
  @Input() receiver?: Receiver;

  @Output() goToMesaageEmit = new EventEmitter<void>()

  goToMessage() {
    this.goToMesaageEmit.next()
  }
}
