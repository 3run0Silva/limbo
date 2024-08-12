import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nightlife-card',
  template: `
    <div
      class="card"
      [ngClass]="{ expanded: isExpanded }"
      (click)="onCardClick()"
      *ngIf="establishment"
    >
      <img
        [src]="establishment.img || 'assets/default-image.png'"
        alt="Nightlife"
      />
      <p>{{ establishment.name || 'Unknown Establishment' }}</p>
      <span>{{
        isExpanded ? establishment.description : truncatedDescription
      }}</span>
      <div class="tags">
        <ion-badge
          [color]="establishment.status === 'OPEN' ? 'success' : 'danger'"
        >
          {{ establishment.status || 'UNKNOWN' }}
        </ion-badge>
      </div>
    </div>
  `,
  styleUrls: ['./nightlife-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class NightlifeCardComponent {
  @Input() establishment: any;
  @Input() isExpanded = false;
  @Output() cardClick = new EventEmitter<void>();

  get truncatedDescription(): string {
    const maxLength = 20;
    if (!this.establishment || !this.establishment.description) {
      return '';
    }
    return this.establishment.description.length > maxLength
      ? this.establishment.description.slice(0, maxLength) + '...'
      : this.establishment.description;
  }

  onCardClick() {
    if (this.establishment) {
      this.cardClick.emit(this.establishment);
    }
  }
}
