import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nightlife-card',
  template: `
    <div class="card" (click)="onCardClick()">
      <img [src]="establishment.img" alt="{{ establishment.name }}" />
      <p>{{ establishment.name }}</p>
      <span>{{ establishment.description }}</span>
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
  @Output() cardClick = new EventEmitter<void>();

  onCardClick() {
    this.cardClick.emit();
  }
}
