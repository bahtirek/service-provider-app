import { Component, OnDestroy, OnInit, SimpleChange, WritableSignal, effect, inject, signal } from '@angular/core';
import { ProviderDetailsComponent } from '../../../../components/provider/provider-details/provider-details.component';
import { ProviderCardComponent } from '../../../../components/provider/provider-card/provider-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../../shared/services/provider.service';
import { Provider } from '../../../../shared/interfaces/provider.interface';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { NewSubjectComponent } from './new-subject/new-subject.component';
import { SubjectService } from '../../../../shared/services/subject.service';
import { SubjectType } from '../../../../shared/interfaces/subject.interface';
import { SubjectListComponent } from '../../../../components/subject/subject-list/subject-list.component';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { take } from 'rxjs/internal/operators/take';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-my-provider',
  standalone: true,
  imports: [ProviderDetailsComponent, ProviderCardComponent, ModalComponent, NewSubjectComponent, SubjectListComponent, BackButtonComponent],
  templateUrl: './my-provider.component.html',
  styleUrl: './my-provider.component.scss'
})
export class MyProviderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private providerService = inject(ProviderService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);

  showFullDetails = true;
  providerProfileDetails: Provider = {};
  providerDetails: Provider = {};
  providerId: string = '';
  toggleModal: boolean = false;
  subjectDetails: any = {};
  subjectList: SubjectType[] = [];
  displayAsCard: boolean = false
  provider: Provider = {};
  providers: Provider[] = [];
  showCompleteDetails: boolean = false;

  ngOnInit(){
    this.providers = this.providerService.providers;
    if (this.providers.length > 0) {
      this.getProviderDetails();
      return;
    }
    this.providerService.providersSource.pipe().subscribe(providers => {
      this.providers = providers;
      this.getProviderDetails();
    })
  }

  createSession(){
    this.toggleModal = true;
    const providerId = this.provider.providerId!

    this.subjectDetails = {
      title: "",
      providerId: providerId
    }
  }

  getProviderDetails(){
    this.provider = this.providerService.getProvider();
    if(!this.provider.providerId) this.navigation.back();
    this.providerService.getProviderProfileDetailsById(this.provider.providerId!).subscribe({
      next: (response) => {
        this.providerProfileDetails = response;
        this.getSubjects(this.provider?.providerId!);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openSession(subject: SubjectType){
    this.cancel();
    this.onSubjectClick(subject)
  }

  getSubjects(providerId: number){
    const isProvider = this.providers.some(item => item.providerId == this.provider.providerId)
    if(!isProvider) {
      this.showCompleteDetails = true
      return;
    }
    this.subjectService.getProviderSubjectsAPI(providerId).subscribe({
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
    this.providerService.addProvider(this.provider)
    this.subjectService.saveSubjectToLocal(subject);
    this.router.navigate(['./messages'], { relativeTo: this.route });
  }

  navigateToDashboard() {
    this.router.navigate(['client/dashboard']);
  }

  cancel() {
    this.toggleModal = false;
  }
}
