import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject} from '@angular/core';
import { Message } from '../../../shared/interfaces/message.interface';
import { AttachmentComponent } from './attachment/attachment.component';
import { Attachment } from '../../../shared/interfaces/attachment.interface';
import { FloatMenu } from '../../../shared/interfaces/float-menu.interface';
import { FloatMenuHorizontalComponent } from '../../../components/float-menu-horizontal/float-menu-horizontal.component';
import { ReplyService } from '../../../shared/services/reply.service';
import { Receiver } from '../../../shared/interfaces/receiver.interface';
import { MessageService } from '../../../shared/services/message.service';
import { AuthUser } from '../../../shared/interfaces/auth.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { ReplyToMessageComponent } from './reply-to-message/reply-to-message.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, NgStyle, DatePipe, AttachmentComponent, FloatMenuHorizontalComponent, MessageHistoryComponent, ReplyToMessageComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, AfterViewInit {
  private replyService = inject(ReplyService);
  private messageService = inject(MessageService);

  message: Message = {};
  messageType: string = "";
  parent: HTMLDivElement | null = null;
  highlight: string = '';
  showFloatMenu: string = '';
  isMobile: boolean = false;
  menuItems: FloatMenu[] = [];
  menuItemsIn: FloatMenu[] = [
    {
      label: "Reply",
      action: "reply",
      icon: "reply"
    },
  ];
  menuItemsOut: FloatMenu[] = [
    {
      label: "Edit",
      action: "edit",
      icon: "edit"
    },
    {
      label: "Reply",
      action: "reply",
      icon: "reply"
    },
    {
      label: "Delete",
      action: "delete",
      icon: "delete",
    },
  ];

  @Input() user?: User;
  @Input() receiver?: Receiver;
  @Input() index?: number;
  @Input() last: boolean = false;
  @Input() set scrollIntoViewProp (value: boolean | undefined) {
    if(value) {
      this.messageContent.nativeElement.scrollIntoView({
        block: "center", // Start, center, end, or nearest. Defaults to start.
        behavior: "smooth"
      });
      this.highlight = 'highlight-message';
    } else {
      this.highlight = ''
    }
  }

  @Input() set message$ (value: any) {
    this.message = value;
    if(this.user!.userId == this.message.createdBy){
      this.messageType = 'out';
      this.menuItems = this.menuItemsOut;
    } else {
      this.messageType = 'in';
      this.menuItems = this.menuItemsIn;
    }
  }

  @Output() onMessageIntersect = new EventEmitter<number>();
  @Output() onAttachmentClickEmit = new EventEmitter<Attachment>()

  @ViewChild('messageContent') messageContent!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.isViewdChecker();
    if(this.index == 0 && this.messageType == 'out') {
      this.messageContent.nativeElement.scrollIntoView();
    }
    if(this.last) this.setLastMessageObserver();
  }

  setLastMessageObserver() {
    const lastMessageObserver = new IntersectionObserver(entries => {
      const lastMessage = entries[0]
      if(!lastMessage.isIntersecting) return
      this.messageService.loadNewChunkOfMessages();
      lastMessageObserver.unobserve(lastMessage.target);
    }, {rootMargin: '200px'})
    lastMessageObserver.observe(this.messageContent.nativeElement);
  }

  isViewdChecker() {
    if(!this.message.viewed && this.messageType !== 'out' && this.messageContent !== undefined) {
      const threshold = 1;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.onMessageIntersect.emit(this.message.messageId)
              observer.disconnect();
            }
          });
        },
        {
          threshold: 1
        }
      );
      observer.observe(this.messageContent.nativeElement);
    }
    if(!this.message.viewed) {
      //check if in viewport
    }
  }

  onAttachmentClick(messageAttachment: Attachment){
    this.onAttachmentClickEmit.emit(messageAttachment);
  }

  menuActionHandle(action: string) {
    console.log(action);
    if(action == "reply") {
      this.message.receiver = this.receiver;
      this.replyService.replyToMessage(this.message);
    } else if(action == "edit") {
      this.replyService.editMessage(this.message)
    }
    this.showFloatMenu = '';
  }

  goToMessage() {
    this.messageService.updateMessageScrollIntoViewProperty(this.message.replyToMessage?.replyToMessageId!, this.messageService.messages())
  }

  onMenuClick() {
    if(window.matchMedia("(min-width: 1025px)").matches) return;
    this.showFloatMenu = 'hold';
    setTimeout(() => {
      this.showFloatMenu = '';
    }, 2000);
  }
}
