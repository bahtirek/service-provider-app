import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {

  transform(size: number): string {
    let formated = (size / (1024)).toFixed(2) + ' KB'
    if(size > 1048576) {
      formated = (size / (1024 * 1024)).toFixed(2) + ' MB'
    }
    return formated;
  }

}
