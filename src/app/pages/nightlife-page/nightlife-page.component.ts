import { Component, OnInit } from '@angular/core';
import { NightlifeService } from '../../components/services/nighlife.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NightlifeCardComponent } from '../../components/nighlife-card/nightlife-card.component';
import { NightlifeMapComponent } from '../../components/nightlife-map/nightlife-map.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Establishment {
  name: string;
  status: string;
  description: string;
  location: [number, number];
  openingTime: string;
  closingTime: string;
}

@Component({
  selector: 'app-nightlife-page',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NightlifeCardComponent,
    NightlifeMapComponent,
  ],
  templateUrl: './nightlife-page.component.html',
  styleUrls: ['./nightlife-page.component.scss'],
})
export class NightlifePageComponent implements OnInit {
  establishments$: Observable<Establishment[]> | undefined;
  selectedEstablishment: Establishment | null = null;
  toastShown = false;

  constructor(private nightlifeService: NightlifeService) {}

  ngOnInit() {
    this.establishments$ = this.nightlifeService.getEstablishments().pipe(
      map((data: Establishment[]) =>
        data.map((establishment: Establishment) => ({
          ...establishment,
          lat: establishment.location[0],
          lng: establishment.location[1],
          status: this.getStatus(
            establishment.openingTime,
            establishment.closingTime
          ),
        }))
      )
    );
  }

  focusEstablishment(establishment: Establishment) {
    this.selectedEstablishment = establishment;
  }

  resetEstablishment() {
    this.selectedEstablishment = null;
  }

  // Function to "calculate" the status of the stablishment based on open and close time params
  getStatus(openingTime: string, closingTime: string): string {
    const now = new Date();
    const open = new Date();
    const close = new Date();

    const [openHour, openMinute] = openingTime.split(':').map(Number);
    open.setHours(openHour, openMinute);

    const [closeHour, closeMinute] = closingTime.split(':').map(Number);
    close.setHours(closeHour, closeMinute);

    if (now >= open && now <= close) {
      return 'OPEN';
    } else {
      return 'CLOSED';
    }
  }
}
