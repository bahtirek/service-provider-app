import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonRow, IonCol, IonText, IonLabel, IonGrid, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { optionsOutline, searchOutline } from 'ionicons/icons';
import { IonicSlides } from '@ionic/angular'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonGrid, IonButtons, IonTitle, IonContent, IonButton, IonIcon, IonRow, IonCol, IonText, IonLabel, IonSearchbar, FormsModule, HeaderComponent, MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  searchKeyword: string = "";
  popular: any[] = []

  swiperModules = [IonicSlides]
  constructor() {
    addIcons({optionsOutline, searchOutline})
  }

  ngOnInit(): void {
    this.popular = [
      {id: 1, title: 'title 1', description: 'description'},
      {id: 2, title: 'title 2', description: 'description'},
      {id: 3, title: 'title 3', description: 'description'},
      {id: 4, title: 'title 4', description: 'description'},
    ]
  }
}
