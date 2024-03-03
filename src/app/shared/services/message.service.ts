import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  messages = signal<Message[]>([])
  subjectId?: number;
  chunkNum: number = 1;

  addMessage(message: Message){
    if(this.messages().some(item => item.messageId == message.messageId)){
      this.updateMessage(message)
    } else {
      this.messages.update(state => {
        state.unshift(message)
        return state
      });
    }
  }

  updateMessage(message: Message) {
    this.messages.update(state => {
      const index = state.findIndex(m => m.messageId == message.messageId)
      if(index != -1) {
        if(state[index].totalUploads) message.totalUploads = state[index].totalUploads! - 1;
        state[index] = message;
      }
      return state
    });
  }

  addMessages(messages: Message[]){
    this.messages.update(state => state.concat(messages));
  }

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  postMessage(messageDetails: Message){
    return this.http.post<any>(this.url + '/messages/message', messageDetails);
  }

  postAttachmentMessage(messageDetails: Message){
    return this.http.post<any>(this.url + '/messages/attachment-message', messageDetails);
  }

  getMessages(subjectId: number, chunkNum: number){
    if(chunkNum == 1) this.chunkNum = 1;
    this.subjectId = subjectId;
    const params = new HttpParams()
    .set('subjectId', subjectId)
    .set('chunkCount', 5)
    .set('chunkNum', chunkNum)
    return this.http.get<Message[]>(this.url + '/messages/subject-messages', {params});
  }

  resetMessages() {
    this.messages.update(() => ([]))
  }

  updateViewedStatus(messageId: number) {
    this.messages.update(messages =>
      messages.map(message => message.messageId === messageId ? {...message, viewed: true} : message)
    )
  }

  uploadFile(messageDetails: any){
    return this.http.post<any>(this.url + '/attachments/upload', messageDetails);
  }

  getAttachmentUrl(messageAttachmentId: number) {
    const params = new HttpParams()
    .set('messageAttachmentId', messageAttachmentId)
    return this.http.get<any>(this.url + '/attachments/attachment-url', {params});
  }

  updateMessageScrollIntoViewProperty(id: number, messages: Message[]) {
    let index = messages.findIndex(message => message.messageId == id)
    if(index != -1) {
      index = this.messages().findIndex(message => message.messageId == id);
      setTimeout(() => {
        this.messages()[index].highlightMessageOnScrollIntoView = true;
      });
      setTimeout(() => {
        this.messages()[index].highlightMessageOnScrollIntoView = false;
      }, 2000);
    } else {
      this.loadNewChunkOfMessages(id)
    }
  }

  loadNewChunkOfMessages(messageId?: number){
    this.chunkNum++
    this.getMessages(this.subjectId!, this.chunkNum).subscribe({
      next: (response) => {
        this.addMessages(response);
        if(messageId) {
          this.updateMessageScrollIntoViewProperty(messageId, response)
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
