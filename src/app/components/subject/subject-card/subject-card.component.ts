import { Component, Input, inject } from '@angular/core';
import { SubjectType } from '../../../shared/interfaces/subject.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss'
})
export class SubjectCardComponent {
  private router = inject(Router);
  @Input() subject: SubjectType = {};

  goToMessages() {
    this.router.navigate([`client/messages/${this.subject.subjectId}`]);
  }
}
