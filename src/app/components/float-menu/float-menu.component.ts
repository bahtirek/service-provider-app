import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-float-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './float-menu.component.html',
  styleUrl: './float-menu.component.scss'
})
export class FloatMenuComponent {
  modalValue: boolean = false;
  fadeAnim: boolean = false;
  fadeIn: boolean = false;

  @Output() modalChange = new EventEmitter<boolean>();
  hideContainer: boolean = true;

  @Input() get modal(){
    return this.modalValue;
  }

  set modal(val) {
    if (val) {
      this.hideContainer = false;
      this.fadeAnim = true;
      setTimeout(() => {
        this.fadeIn = true;
      });
    } else {
      this.fadeIn = false;
      setTimeout(() => {
        this.fadeAnim = false;
        this.hideContainer = true;
      }, 400);
    }

    this.modalValue = val;
    this.modalChange.emit(this.modalValue);
  }

  closeModal(){
    this.modal = false;
  }

}
