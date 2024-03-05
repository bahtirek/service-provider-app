import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-enevelope',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './enevelope.component.html',
  styleUrl: './enevelope.component.scss'
})
export class EnevelopeComponent {
  count: number = 0;

  constructor() {
    addIcons({chatbubbleEllipsesOutline})
  }

  @Input() set newMessageCount(count: number){
    if(count && count > 0) this.count = count
  }
}
