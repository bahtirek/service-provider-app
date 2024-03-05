import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonMenu, IonMenuButton, IonIcon, IonItem, IonNote, IonList, IonLabel, IonToolbar, IonButtons, IonTitle, IonHeader, IonThumbnail, MenuController } from '@ionic/angular/standalone';
import { HeaderNavMenu } from 'src/app/shared/interfaces/header-nav-menu.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonNote, IonItem, IonIcon, IonMenu, IonMenuButton, IonContent, IonList, IonLabel, IonButtons, IonToolbar, IonTitle, IonHeader, IonThumbnail, IonIcon,]
})
export class MenuComponent  implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private readonly _subscription: Subscription = new Subscription();

  constructor(private menuCtrl: MenuController) {
    addIcons({closeOutline})
  }

  ngOnInit() {
    if(this.auth.user().accessToken) this.setMenuList()

    this._subscription.add(
      this.auth.isLoggedInSource.subscribe((value) => {
        if (value) {
          this.setMenuList();
        } else {
          this.loggedInMenuItems = this.authMenuItems
        }
      })
    )
  }

  setMenuList() {
    if(this.auth.user().user?.isProvider) {
      this.loggedInMenuItems = this.providerMenuItems
    } else {
      this.loggedInMenuItems = this.clientMenuItems
    }
  }

  toggleSideMenu() { this.menuCtrl.toggle('mainMenu'); }

  navigateTo(url: string) {
    console.log(url);
    this.menuCtrl.close();
    if(url =='logout') {
      this.auth.logout('home');
    } else {
      this.router.navigate([url]);
    }
  }

  loggedInMenuItems: HeaderNavMenu[] = [
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
    {
      name: 'Login',
      url: 'auth/login',
      icon: 'login'
    },
    {
      name: 'Sign up',
      url: 'auth/registration',
      icon: 'person_add'
    }
  ]

  clientMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'client/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
    {
      name: 'My Profile',
      url: `client/profile`,
      icon: 'manage_accounts'
    },
    {
      name: 'Logout',
      url: 'logout',
      icon: 'logout'
    },
  ]
  providerMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'provider/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'My Profile',
      url: `provider/profile`,
      icon: 'manage_account'
    },
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
    {
      name: 'Logout',
      url: 'logout',
      icon: 'logout'
    },
  ]
  authMenuItems: HeaderNavMenu[] = [
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
    {
      name: 'Login',
      url: 'auth/login',
      icon: 'login'
    },
    {
      name: 'Sign up',
      url: 'auth/registration',
      icon: 'person_add'
    }
  ]
}
