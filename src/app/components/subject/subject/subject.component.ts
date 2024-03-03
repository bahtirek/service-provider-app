import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectType } from '../../../shared/interfaces/subject.interface';
import { EnevelopeComponent } from '../../enevelope/enevelope.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [EnevelopeComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Output() onSubjectClick$ = new EventEmitter<SubjectType>();
  @Input() subject: SubjectType = {};

  onSubjectClick(){
    this.onSubjectClick$.emit(this.subject)
  }

}
