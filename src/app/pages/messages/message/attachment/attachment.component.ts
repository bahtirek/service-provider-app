import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../../../shared/interfaces/attachment.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-attachment',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss'
})
export class AttachmentComponent {
  file?: Attachment;
  fileUrl: string = '';
  fileType: string = 'UNK'
  isGif: boolean = false;

  @Input() set fileProp(file: Attachment){
    if(file.attachmentMimeType?.includes('gif')) this.isGif = true;
    this.file = file;
    this.fileUrl = `url("${file.thumbnailUrl}")`
  }

  @Output() onAttachmentClickEmit = new EventEmitter<Attachment>();

  onAttachmentClick(event: PointerEvent | MouseEvent){
    event.stopPropagation();
    this.onAttachmentClickEmit.emit(this.file);
  }
}
