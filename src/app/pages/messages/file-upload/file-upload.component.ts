import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { FileDetailsComponent } from './file-details/file-details.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FormsModule, FileDetailsComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  files?: FileList;
  comment: string = "";

  @Input() set filesProp(files: FileList){
    this.files = files
  }

  @Output() cancel = new EventEmitter<boolean>();
  @Output() fileUploadEmit = new EventEmitter<string>();
  @Output() thumbnailEvent = new EventEmitter<any>();

  handleThumbnailEvent(thumbnail: string, index: number) {
    this.thumbnailEvent.emit({
      thumbnail: thumbnail,
      index: index
    })
  }

  onCancel(){
    this.cancel.emit(true)
  }

  onSend(){
    this.fileUploadEmit.emit(this.comment.trim());
    this.comment = '';
  }
}
