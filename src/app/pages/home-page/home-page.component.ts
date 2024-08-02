import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  openEstablishments: number = 0;
  closedEstablishments: number = 0;
  newPhotos: number = 0;
  totalPhotos: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.openEstablishments = 10;
    this.closedEstablishments = 30;
    this.newPhotos = 10;
    this.totalPhotos = 32;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
