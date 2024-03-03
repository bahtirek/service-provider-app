import { Component, EventEmitter, Input, Output, Provider } from '@angular/core';
import { SubjectCardComponent } from '../subject-card/subject-card.component';
import { SubjectType } from '../../../shared/interfaces/subject.interface';
import { SubjectComponent } from '../subject/subject.component';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [SubjectCardComponent, SubjectComponent],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {
  @Input() subjectList: SubjectType[] = [];
  @Input() displayAsCard: boolean = true;

  @Output() onSubjectClick$ = new EventEmitter<SubjectType>();

  onSubjectClick(subject: SubjectType){
    this.onSubjectClick$.emit(subject)
  }
}
