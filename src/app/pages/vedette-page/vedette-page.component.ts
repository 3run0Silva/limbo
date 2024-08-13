import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

interface VedetteImage {
  img: string;
  description: string;
}

@Component({
  selector: 'app-vedette-page',
  templateUrl: './vedette-page.component.html',
  styleUrls: ['./vedette-page.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class VedettePageComponent implements OnInit {
  mainImage: VedetteImage | undefined;
  midImage: VedetteImage | undefined;
  endImage: VedetteImage | undefined;
  selectedImage: VedetteImage | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // Fetches the images from Firestore when the component initializes
    this.fetchMainImage();
    this.fetchMidImage();
    this.fetchEndImage();
  }

  // Fetches the main image data from the 'vedette' collection in Firestore
  async fetchMainImage() {
    const mainImageDoc = doc(this.firestore, 'vedette', 'main');
    const mainImageSnapshot = await getDoc(mainImageDoc);
    if (mainImageSnapshot.exists()) {
      this.mainImage = mainImageSnapshot.data() as VedetteImage;
    }
  }

  // Fetches the mid article image data from Firestore
  async fetchMidImage() {
    const midImageDoc = doc(this.firestore, 'vedette', 'imgmd');
    const midImageSnapshot = await getDoc(midImageDoc);
    if (midImageSnapshot.exists()) {
      this.midImage = midImageSnapshot.data() as VedetteImage;
    }
  }

  // Fetches the end article image data from Firestore
  async fetchEndImage() {
    const endImageDoc = doc(this.firestore, 'vedette', 'imgend');
    const endImageSnapshot = await getDoc(endImageDoc);
    if (endImageSnapshot.exists()) {
      this.endImage = endImageSnapshot.data() as VedetteImage;
    }
  }

  // Toggles the display of the image description overlay
  toggleDescription(image: VedetteImage) {
    // If the clicked image is already selected, deselect it, otherwise select it
    this.selectedImage = this.selectedImage === image ? null : image;
  }
}
