import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-photo-modal',
  templateUrl: './add-photo-modal.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AddPhotoModalComponent {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }

  async selectPhotoFromDevice() {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri,
    });
    this.modalController.dismiss({
      imageUrl: image.webPath,
    });
  }

  async takePhotoWithCamera() {
    const image = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });
    this.modalController.dismiss({
      imageUrl: image.webPath,
    });
  }
}
