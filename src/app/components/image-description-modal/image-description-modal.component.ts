import { Component, Input } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-description-popover',
  template: `
    <ion-content>
      <div class="popover-content">
        <p>{{ description }}</p>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .popover-content {
        padding: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 8px;
      }
      p {
        margin: 0;
        font-size: 14px;
      }
    `,
  ],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ImageDescriptionPopoverComponent {
  @Input() description: string = '';

  constructor(private popoverController: PopoverController) {}

  close() {
    this.popoverController.dismiss();
  }
}
