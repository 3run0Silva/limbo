import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'limbo';
}
