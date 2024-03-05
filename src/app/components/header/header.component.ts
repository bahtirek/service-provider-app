import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { IonHeader, IonTitle, IonToolbar, IonButtons,  IonThumbnail, IonIcon, MenuController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonButtons, IonToolbar, IonTitle, IonHeader, IonThumbnail, IonIcon,RouterLink, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private auth = inject(AuthService);
  toggleMenuModal: boolean = false;
  constructor(private menuCtrl: MenuController) {
    addIcons({menuOutline})
  }

  toggleSideMenu() { this.menuCtrl.toggle('mainMenu'); }
}
