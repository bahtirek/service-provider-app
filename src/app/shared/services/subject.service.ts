import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubjectType } from '../interfaces/subject.interface';
import { Message } from '../interfaces/message.interface';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  subjects: SubjectType[] = [];
  subjectsSource: Subject<SubjectType[]> = new Subject;
  providerId?: number;
  clientId?: number;

  createSubject(subjectDetails: any){
    return this.http.post<any>(this.url + '/messages/subject', subjectDetails);
  }

  getProviderSubjectsAPI(providerId: number){
    const params = new HttpParams().set('providerId', providerId);
    return this.http.get<SubjectType[]>(this.url + '/messages/client-provider-subjects', {params})
  }

  getClientSubjectsAPI(providerId: number){
    const params = new HttpParams().set('clientId', providerId);
    return this.http.get<SubjectType[]>(this.url + '/messages/provider-client-subjects', {params})
  }

  saveSubjectToLocal(subject: SubjectType){
    window.localStorage.setItem('subject', JSON.stringify(subject))
  }

  getSubjectFromLocal(){
    const subject = window.localStorage.getItem('subject')
    return subject ? JSON.parse(subject) : null
  }

  getProviderSubjects(providerId: number){
    // return previosly loaded subjects
    if(this.providerId && this.providerId == providerId && this.subjects.length > 0) {
      this.subjectsSource.next(this.subjects);
      return
    }
    // get subject from back
    this.providerId = providerId;
    this.getProviderSubjectsAPI(providerId).subscribe({
      next: (response: SubjectType[]) => {
        this.subjects = response;
        this.subjectsSource.next(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getClientSubjects(clientId: number){
    // return previosly loaded subjects
    if(this.clientId && this.clientId == clientId && this.subjects.length > 0) {
      this.subjectsSource.next(this.subjects);
      return
    }
    this.clientId == clientId;
    // get subject from back
    this.getClientSubjectsAPI(clientId).subscribe({
      next: (response: SubjectType[]) => {
        this.subjectsSource.next(response);
        this.subjects = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateSubjects(id: number){
    const index = this.subjects.findIndex(subject => subject.subjectId === id);
    if(index != -1) {
      this.subjects[index].newMessageCount = this.subjects[index].newMessageCount!+1
    }
  }
}
