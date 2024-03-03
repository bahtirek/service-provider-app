import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormErrorComponent } from '../../../../../shared/form-helpers/form-error/form-error.component';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../../../../../shared/services/subject.service';
import { SubjectType } from '../../../../../shared/interfaces/subject.interface';
import { ProviderService } from '../../../../../shared/services/provider.service';

@Component({
  selector: 'app-new-subject',
  standalone: true,
  imports: [FormErrorComponent, FormsModule],
  templateUrl: './new-subject.component.html',
  styleUrl: './new-subject.component.scss'
})
export class NewSubjectComponent {
  private subjectService = inject(SubjectService);
  private providerService = inject(ProviderService)

  sessionTitle: string = "";
  errorMessage: string = "";
  validationStarted: boolean = false;

  @Input() subjectDetails: any = {}

  @Input() set toggleModal (value: boolean) {
    if(!value) this.sessionTitle = "";
  }

  @Output() cancel = new EventEmitter<null>();

  @Output() openSession = new EventEmitter<SubjectType>();

  createSession(){
    const title = this.sessionTitle.trim();
    if (!title) {
      this.errorMessage = "Field required"
      this.validationStarted = true;
      return;
    }

    this.subjectDetails.title = title

    this.subjectService.createSubject(this.subjectDetails).subscribe({
      next: (response) => {
        if(response.subjectId) this.openSession.emit(response);
        this.sessionTitle = "";
        this.subjectService.getProviderSubjects(this.subjectDetails.providerId);
        this.providerService.setMyProviders();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onModelChange(value: string) {
    if(!value.trim() && this.validationStarted) {
      this.errorMessage = "Field required"
    } else {
      this.errorMessage = ""
    }
  }

  onCancel(){
    this.sessionTitle = "";
    this.cancel.emit();
  }
}
