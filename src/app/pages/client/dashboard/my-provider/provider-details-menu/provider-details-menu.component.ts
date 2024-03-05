import { Component, Input, OnInit } from '@angular/core';
import { IonContent, IonMenu, IonMenuButton, IonMenuToggle, IonIcon, IonItem, IonNote, IonList, IonLabel, IonToolbar, IonButtons, IonTitle, IonHeader, IonThumbnail, MenuController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, mailOutline, mapOutline, informationCircleOutline, calendarOutline, callOutline } from 'ionicons/icons';
import { Provider } from 'src/app/shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-details-menu',
  templateUrl: './provider-details-menu.component.html',
  styleUrls: ['./provider-details-menu.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonNote, IonItem, IonIcon, IonMenu, IonMenuButton, IonContent, IonList, IonLabel, IonButtons, IonToolbar, IonTitle, IonHeader, IonMenuToggle, IonThumbnail, IonIcon,]
})
export class ProviderDetailsMenuComponent  implements OnInit {

  constructor(private menuCtrl: MenuController) {
    addIcons({closeOutline, mailOutline, mapOutline, informationCircleOutline, calendarOutline, callOutline })
  }

  @Input() providerProfileDetails: Provider = {}

  ngOnInit() {
    console.log('some');
  }

}
