import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButtons, IonIcon, IonThumbnail } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IonIcon, NgClass, IonButtons, IonThumbnail],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  modalValue: boolean = false;
  fadeAnim: boolean = false;
  fadeIn: boolean = false;

  constructor() {
    addIcons({closeOutline})
  }

  @Output()
  modalChange = new EventEmitter<boolean>();

  @Input()
  get modal(){
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
}
