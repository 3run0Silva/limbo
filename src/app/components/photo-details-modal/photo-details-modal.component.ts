import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-details-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './photo-details-modal.component.html',
})
export class PhotoDetailsModalComponent {
  @Input() imageUrl: string = '';
  author: string = '';
  description: string = '';

  constructor(private modalController: ModalController) {}

  save() {
    this.modalController.dismiss({
      imageUrl: this.imageUrl,
      author: this.author,
      description: this.description,
    });
  }

  close() {
    this.modalController.dismiss();
  }
}
