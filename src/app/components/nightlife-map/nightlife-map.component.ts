import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoPoint } from 'firebase/firestore';

@Component({
  selector: 'app-nightlife-map',
  template: `
    <div id="map-wrapper" #mapWrapper>
      <div id="map"></div>
    </div>
  `,
  styleUrls: ['./nightlife-map.component.scss'],
  standalone: true,
})
export class NightlifeMapComponent implements AfterViewInit, OnChanges {
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;
  @Input() establishments: any[] = [];
  @Input() selectedEstablishment: any = null;
  @Output() markerClick = new EventEmitter<any>();

  map!: L.Map;
  markers: L.Marker[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map && changes['establishments']) {
      this.addMarkers();
    }

    if (this.map && changes['selectedEstablishment']) {
      this.updateMapView();
    }
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

    this.addMarkers();
  }

  addMarkers() {
    // Clear existing markers
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    // Add markers
    this.establishments.forEach((establishment) => {
      const location = establishment.location;

      if (location instanceof GeoPoint) {
        const lat = location.latitude;
        const lng = location.longitude;

        const marker = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup(
            `<b>${establishment.name}</b><br>${establishment.description}`
          );

        marker.on('click', () => {
          this.markerClick.emit(establishment);
        });

        this.markers.push(marker);
      } else {
        console.error('Invalid location data:', location);
      }
    });
  }

  updateMapView() {
    if (
      this.selectedEstablishment &&
      this.selectedEstablishment.location instanceof GeoPoint
    ) {
      const location = this.selectedEstablishment.location;
      const lat = location.latitude;
      const lng = location.longitude;
      this.map.setView([lat, lng], 15);
    } else {
      console.error(
        'Invalid selectedEstablishment location data:',
        this.selectedEstablishment
      );
    }
  }
}
