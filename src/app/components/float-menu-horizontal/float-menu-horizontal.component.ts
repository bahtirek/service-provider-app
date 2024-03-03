import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FloatMenu } from '../../shared/interfaces/float-menu.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-float-menu-horizontal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './float-menu-horizontal.component.html',
  styleUrl: './float-menu-horizontal.component.scss'
})
export class FloatMenuHorizontalComponent {
  disable: string = '';

  @Input() menuItems: FloatMenu[] = [];

  @Input() set viewedProp (value: boolean) {
    if(value) this.disable = 'delete'
  }

  @Output() menuActionEmit = new EventEmitter<string>();

  btnClick(action: string) {
    this.menuActionEmit.emit(action)
  }

}
