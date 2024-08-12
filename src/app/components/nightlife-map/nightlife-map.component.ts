import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';

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
export class NightlifeMapComponent implements AfterViewInit {
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;
  @Input() establishments: any[] = [];
  @Input() selectedEstablishment: any = null;

  map!: L.Map;

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

    // Establishment markers
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

  ngOnChanges() {
    if (this.map && this.selectedEstablishment) {
      const { lat, lng } = this.selectedEstablishment;
      this.map.setView([lat, lng], 15);
      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(
          `<b>${this.selectedEstablishment.name}</b><br>${this.selectedEstablishment.description}`
        )
        .openPopup();
    }
  }
}
