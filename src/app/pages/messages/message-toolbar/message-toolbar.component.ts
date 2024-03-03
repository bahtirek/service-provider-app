import { Component, Input, OnDestroy, OnInit, Renderer2, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../shared/interfaces/message.interface';
import { SubjectService } from '../../../shared/services/subject.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MessageService } from '../../../shared/services/message.service';
import { ReplyService } from '../../../shared/services/reply.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ReplyToMessageDetailsComponent } from './reply-to-message-details/reply-to-message-details.component';

@Component({
  selector: 'app-message-toolbar',
  standalone: true,
  imports: [FormsModule, NgClass, ModalComponent, FileUploadComponent, ReplyToMessageDetailsComponent],
  templateUrl: './message-toolbar.component.html',
  styleUrl: './message-toolbar.component.scss'
})
export class MessageToolbarComponent implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  private auth = inject(AuthService);
  private chatService = inject(ChatService)
  private subjectService = inject(SubjectService);
  private messageService = inject(MessageService);
  private replyService = inject(ReplyService);
  private readonly _subscription: Subscription = new Subscription();


  message: string = "";
  showCursor: boolean = true;
  subjectId?: number;
  toggleModal: boolean = false;
  files?: FileList;
  uploadInprogress = signal<number>(0);
  videoThumbnails: any[] = [];
  replyToMessageId?: number | null = null;
  replyToMessage: Message = {};
  messageToEditId?: number;

  @Input() receiverId?: number;

  @ViewChild('textAreaContainer') textAreaContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;


  ngOnInit(){
    this._subscription.add(
      this.replyService.onMessageReplay.subscribe((message: Message) => {
        this.resetMessageInputField();
        this.replyToMessage = message;
        this.replyToMessageId = message.messageId;
      })
    )
    this._subscription.add(
      this.replyService.onMessageEdit.subscribe((message: Message) => {
        this.resetMessageInputField();
        this.replyToMessage = message;
        this.messageToEditId = message.messageId!;
        this.renderer.setAttribute(this.textAreaContainer.nativeElement, 'data-replicated-value',  message.message!)
        this.textArea.nativeElement.value = message.message!;
      })
    )
    this.getSubjectDetails();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  getSubjectDetails() {
    const subject = this.subjectService.getSubjectFromLocal();
    if(subject) {
      this.subjectId = subject.subjectId;
      this.chatService.setSubjectId(this.subjectId!);
    }
  }

  onSubmit(){
    if(!this.subjectId || !this.receiverId) return;
    const newMessage = this.textAreaContainer.nativeElement.dataset['replicatedValue']?.trim();
    if (!newMessage) return;
    if(this.messageToEditId) {
      this.postEditedMessage(newMessage)
    } else {
      this.postNewOrReplyMessage(newMessage)
    }
  }

  postNewOrReplyMessage(newMessage: string){
    const messageDetails: Message = {
      subjectId: this.subjectId,
      message: newMessage,
      accessToken: this.auth.user().accessToken,
      toUserId: this.receiverId,
      replyToMessageId: this.replyToMessageId
    };
    this.chatService.sendMessage(messageDetails);
    this.resetMessageInputField();
  }

  postEditedMessage(newMessage: string){
    console.log(newMessage);
    const messageDetails: Message = {
      message: newMessage,
      accessToken: this.auth.user().accessToken,
      messageId: this.messageToEditId
    };
    this.chatService.updateMessage(messageDetails);
    this.resetMessageInputField();
  }

  resetMessageInputField() {
    this.renderer.setAttribute(this.textAreaContainer.nativeElement, 'data-replicated-value',  "")
    this.textArea.nativeElement.value = "";
    this.showCursor = true;
    this.replyToMessage = {};
    this.replyToMessageId = null;
    this.messageToEditId = undefined;
  }

  onAttach(){
    const ext = /(\.jpg|\.jpeg|\.bmp|\.gif|\.svg|\.png|\.webm|\.avi|\.mpeg|\.mkv|\.doc|\.docx|\.xls|\.xlsx|\.pdf)$/i;
    const files = this.fileUpload.nativeElement.files;
    if(files && files.length > 0) {
      this.files = files;
      this.toggleModal = true;
    }
  }

  onBlur(){
    if (this.textArea.nativeElement.value) {
      this.showCursor = false;
    } else {
      this.showCursor = true;
    }
  }

  submitAttachmentMessage(comment: string) {
    this.toggleModal = false;
    const messageDetails: any = {
      subjectId: this.subjectId,
      message: comment,
      accessToken: this.auth.user().accessToken,
      toUserId: this.receiverId,
      isAttachment: true,
      replyToMessageId: this.replyToMessageId
    };

    this.messageService.postAttachmentMessage(messageDetails).subscribe({
      next: (response: Message) => {
        response.totalUploads = this.files!.length;
        this.messageService.addMessage(response);
        if(response.messageId) this.submitFiles(response.messageId);
        this.resetMessageInputField();
      },
      error: (error) => {
        console.log();
      }
    })
  }

  submitFiles( messageId: number) {
    if(!this.files || this.files.length == 0) return;
    let count = 0;
    [...this.files].forEach((file: any) => {
      let blob = '';
      const thumbnail = this.videoThumbnails.find(item => item.index == count);
      if(thumbnail) blob = thumbnail.thumbnail;
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('messageId', messageId.toString());
      formData.append('thumbnailBlob', blob)
      this.messageService.uploadFile(formData).subscribe({
        next: (response) => {
          this.messageService.updateMessage(response);
          this.chatService.sendAttchmentMessage(response, this.receiverId!);
        },
        error: (err) => {
          console.log(err);
        },
      })
      count++;
    });
  }

  handleThumbnailEvent(thumbnail: any) {
    this.videoThumbnails.push(thumbnail)
  }

  onFocus(){
    this.showCursor = false;
  }

  cancel() {
    this.toggleModal = false;
    this.fileUpload.nativeElement.value = '';
    this.replyToMessage = {};
    this.replyToMessageId = null;
    this.messageToEditId = undefined;
  }
}
