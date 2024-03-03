import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-enevelope',
  standalone: true,
  imports: [],
  templateUrl: './enevelope.component.html',
  styleUrl: './enevelope.component.scss'
})
export class EnevelopeComponent {
  count: number = 0

  @Input() set newMessageCount(count: number){
    if(count && count > 0) this.count = count
  }
}
