import { Component, Input } from '@angular/core';
import { FloatMenu } from '../../shared/interfaces/float-menu.interface';

@Component({
  selector: 'app-float-menu',
  standalone: true,
  imports: [],
  templateUrl: './float-menu.component.html',
  styleUrl: './float-menu.component.scss'
})
export class FloatMenuComponent {

  @Input() menuItems: FloatMenu[] = []

}
