import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { SubjectListComponent } from '../../../../components/subject/subject-list/subject-list.component';
import { SubjectType } from '../../../../shared/interfaces/subject.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../../shared/services/subject.service';
import { ProviderService } from '../../../../shared/services/provider.service';
import { ClientService } from '../../../../shared/services/client.service';
import { Client } from '../../../../shared/interfaces/client.interface';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-my-client',
  standalone: true,
  imports: [BackButtonComponent, SubjectListComponent],
  templateUrl: './my-client.component.html',
  styleUrl: './my-client.component.scss'
})
export class MyClientComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clientService = inject(ClientService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);

  subjectList = this.subjectService.subjects;
  displayAsCard: boolean = false
  clientDetails: Client = {}

  ngOnInit(){
    this.getSubjects()
  }

  getSubjects(){
    this.clientDetails = this.clientService.getClient();
    if(!this.clientDetails.clientId) this.navigation.back();
    this.subjectService.getClientSubjectsAPI(this.clientDetails.clientId!).subscribe({
      next: (response: SubjectType[]) => {
        this.subjectList = response;
        this.subjectService.subjects = response;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  onSubjectClick(subject: SubjectType){
    this.subjectService.saveSubjectToLocal(subject);
    this.router.navigate(['./messages'], { relativeTo: this.route });
  }
}
