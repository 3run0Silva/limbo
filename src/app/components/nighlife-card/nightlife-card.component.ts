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
    >
      <img [src]="establishment.img" alt="Nightlife" />
      <p>{{ establishment.name }}</p>
      <span>{{
        isExpanded ? establishment.description : truncatedDescription
      }}</span>
      <div class="tags">
        <ion-badge
          [color]="establishment.status === 'OPEN' ? 'success' : 'danger'"
        >
          {{ establishment.status }}
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
    return this.establishment.description.length > maxLength
      ? this.establishment.description.slice(0, maxLength) + '...'
      : this.establishment.description;
  }

  onCardClick() {
    this.cardClick.emit();
  }
}
