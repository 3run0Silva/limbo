import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NightlifeService } from '../../components/services/nighlife.service';

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

  constructor(
    private router: Router,
    private nightlifeService: NightlifeService
  ) {}

  ngOnInit() {
    this.fetchEstablishmentStatus();
    this.newPhotos = 10;
    this.totalPhotos = 32;
  }

  fetchEstablishmentStatus() {
    this.nightlifeService.getEstablishments().subscribe((data) => {
      this.openEstablishments = data.filter((establishment) =>
        this.isOpen(establishment.openingTime, establishment.closingTime)
      ).length;
      this.closedEstablishments = data.length - this.openEstablishments;
    });
  }

  isOpen(openingTime: string, closingTime: string): boolean {
    const now = new Date();
    const open = new Date();
    const close = new Date();

    const [openHour, openMinute] = openingTime.split(':').map(Number);
    open.setHours(openHour, openMinute);

    const [closeHour, closeMinute] = closingTime.split(':').map(Number);
    close.setHours(closeHour, closeMinute);

    return now >= open && now <= close;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
