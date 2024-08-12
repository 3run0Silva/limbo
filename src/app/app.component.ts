import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonCard,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonCard,
    IonButtons,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonRouterOutlet,
    IonApp,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'limbo';

  constructor(private menuCtrl: MenuController, private router: Router) {}

  async closeMenu(route: string) {
    console.log('Menu close triggered, navigating to:', route);

    try {
      await this.router.navigate([route]);
      console.log('Navigation complete. Attempting to close menu...');

      await this.menuCtrl.close('main-menu');

      console.log('Menu toggle command sent.');
    } catch (error) {
      console.error('Error during navigation or menu closing:', error);
    }
  }
}
