import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-nightlife-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './nightlife-page.component.html',
  styleUrls: ['./nightlife-page.component.scss'],
})
export class NightlifePageComponent implements OnInit, AfterViewInit {
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;
  map!: L.Map;
  establishments = [
    {
      name: 'Bar 1',
      status: 'OPEN',
      description: 'A cozy bar with a great selection of beers.',
      lat: 46.2044,
      lng: 6.1432,
    },
    {
      name: 'Bar 2',
      status: 'CLOSED',
      description: 'A lively place with live music every weekend.',
      lat: 46.204,
      lng: 6.1435,
    },
    {
      name: 'Bar 3',
      status: 'OPEN',
      description: 'A lively place with live music every weekend.',
      lat: 46.204,
      lng: 6.1337,
    },
    {
      name: 'Bar 4',
      status: 'OPEN',
      description: 'A lively place with live music every weekend.',
      lat: 46.204,
      lng: 6.1244,
    },
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  initMap() {
    this.map = L.map(this.mapWrapper.nativeElement, {
      center: [46.2044, 6.1432],
      zoom: 13,
      minZoom: 0.5,
      maxZoom: 18,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Map bounds
    const bounds = L.latLngBounds([45.0, 5.0], [47.0, 7.0]);
    this.map.setMaxBounds(bounds);
    this.map.on('drag', () => {
      this.map.panInsideBounds(bounds, { animate: false });
    });

    // stablishment markers
    this.establishments.forEach((establishment) => {
      L.marker([establishment.lat, establishment.lng])
        .addTo(this.map)
        .bindPopup(
          `<b>${establishment.name}</b><br>${establishment.description}`
        )
        .openPopup();
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  focusEstablishment(establishment: any) {
    const { lat, lng } = establishment;
    this.map.setView([lat, lng], 15);
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`<b>${establishment.name}</b><br>${establishment.description}`)
      .openPopup();
  }
}
