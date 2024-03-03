import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonThumbnail, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonButtons, IonToolbar, IonTitle, IonHeader, IonMenuToggle, IonThumbnail, IonIcon,RouterLink, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private auth = inject(AuthService);
  toggleMenuModal: boolean = false;
  constructor() {
    addIcons({menuOutline})
  }


  openMenu(){
    this.toggleMenuModal = true
  }

  closeMenu(){
    this.toggleMenuModal = false
  }
}
