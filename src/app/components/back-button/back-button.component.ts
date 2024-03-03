import { Location, NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  private location = inject(Location);

  @Input() class: string = 'my-md';
  @Input() color: string = '';

  goBack(): void {
    this.location.back();
  }
}
