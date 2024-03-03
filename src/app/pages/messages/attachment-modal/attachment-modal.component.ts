import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-attachment-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './attachment-modal.component.html',
  styleUrl: './attachment-modal.component.scss'
})
export class AttachmentModalComponent {
  modalValue: boolean = false;
  fadeAnim: boolean = false;
  fadeIn: boolean = false;

  @Output() modalChange = new EventEmitter<boolean>();

  @Input() get modal(){
    return this.modalValue;
  }

  set modal(val) {
    if (val) {
      this.fadeAnim = true;
      setTimeout(() => {
        this.fadeIn = true;
      });
    } else {
      this.fadeIn = false;
      setTimeout(() => {
        this.fadeAnim = false;
      });
    }

    this.modalValue = val;
    this.modalChange.emit(this.modalValue);
  }

  closeModal(){
    this.modal = false;
  }

  preventClick(event: Event) {
    event.stopPropagation();
  }
}
