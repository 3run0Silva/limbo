import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-photo-modal',
  templateUrl: './add-photo-modal.component.html',
  styleUrls: ['./add-photo-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddPhotoModalComponent implements OnInit {
  imageUrl: string = '';
  description: string = '';
  author: string = '';
  maxDescriptionLength = 150;

  constructor(
    private modalController: ModalController,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // Automatically sign in anonymously when the modal opens
    signInAnonymously(this.auth).then((userCredential) => {
      // console.log('Signed in anonymously', userCredential);
    });
  }

  // Allows the user to select a photo from their device
  async selectPhotoFromDevice() {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri,
    });
    this.imageUrl = image.webPath || '';
  }

  // Allows the user to take a new photo with the device's camera
  async takePhotoWithCamera() {
    const image = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });
    this.imageUrl = image.webPath || '';
  }

  // Submits the photo along with its details to Firestore
  async submitPhoto() {
    // Validate input before submission
    if (this.description.length > this.maxDescriptionLength || !this.author) {
      console.error('Invalid input');
      return;
    }

    // Add the photo details to the 'admin' collection in Firestore for approval
    const adminCollection = collection(this.firestore, 'admin');
    await addDoc(adminCollection, {
      imageUrl: this.imageUrl,
      description: this.description,
      author: this.author,
      date: new Date(),
      approved: false,
    });

    // Close the modal and return the image URL
    this.modalController.dismiss({ imageUrl: this.imageUrl });
  }

  // Closes the modal without submitting
  close() {
    this.modalController.dismiss();
  }
}
