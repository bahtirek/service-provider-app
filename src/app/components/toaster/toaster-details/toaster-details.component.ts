import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Toast } from '../../../shared/interfaces/toaster.interface';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-toaster-details',
  standalone: true,
  imports: [],
  templateUrl: './toaster-details.component.html',
  styleUrl: './toaster-details.component.scss',
  animations: [
    trigger('toasterState', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]

})
export class ToasterDetailsComponent {
  private toaster = inject(ToasterService)

  @Input() toast!: Toast;
  @Input() i!: number;

  ngOnInit() {
    setTimeout(() => this.toaster.removeLastToast(), this.toast.delay || 6000);
  }

  removeToast() {
    this.toaster.removeToast(this.i);
  }
}
