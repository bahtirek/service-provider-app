import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../../../shared/interfaces/message.interface';
import { NgStyle } from '@angular/common';
import { Attachment } from '../../../../shared/interfaces/attachment.interface';

@Component({
  selector: 'app-reply-to-message-details',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './reply-to-message-details.component.html',
  styleUrl: './reply-to-message-details.component.scss'
})
export class ReplyToMessageDetailsComponent {
  message: Message = {};
  attachment?: Attachment;
  attachmentUrl: string = '';
  attachmentType: string = 'UNK'
  title: string = '';

  @Input() set messageProp (message: Message) {
    this.reset();
    this.message = message;
    this.setAttachment();
  };

  @Input() set isEditingProp (editing: number | null) {
    if (editing) {
      this.title = 'Editing message:'
    } else {
      this.title = `Reply to ${this.message.receiver?.firstName} ${this.message.receiver?.lastName}`
    }
  };

  @Output() cancelEmit = new EventEmitter<void>();

  setAttachment(){
    if(this.message.attachments!.length == 0) return;
    this.attachment = this.message.attachments![0];
    if(this.attachment.thumbnailUrl != null) {
      this.attachmentUrl = `url("${this.attachment.thumbnailUrl}")`
    }
  }

  cancel(){
    this.reset();
    this.cancelEmit.next();
  }

  reset(){
    this.message = {};
    this.attachment = {};
    this.attachmentUrl = '';
  }

}
