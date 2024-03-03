import { Component, computed, inject } from '@angular/core';
import { ToasterDetailsComponent } from './toaster-details/toaster-details.component';
import { Toast } from '../../shared/interfaces/toaster.interface';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [ToasterDetailsComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {

  private toaster = inject(ToasterService)

  toasts = computed(() => {
    return this.toaster.toasts()
  });
}
