import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {
  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

  @Input() src: string = "";
}
