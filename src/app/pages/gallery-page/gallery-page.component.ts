import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AddPhotoModalComponent } from '../../components/add-photo-modal/add-photo-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, IonicModule, AddPhotoModalComponent],
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  photos$!: Observable<
    { img: string; description: string; author: string; date: string }[]
  >;
  selectedPhoto: {
    img: string;
    description: string;
    author: string;
    date: string;
  } | null = null;
  showInfo = false;

  constructor(
    private firestore: Firestore,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.photos$ = this.fetchPhotos();
  }

  // Fetches the photos from the 'gallery' collection in Firestore
  fetchPhotos(): Observable<
    { img: string; description: string; author: string; date: string }[]
  > {
    const photoCollection = collection(this.firestore, 'gallery');
    return collectionData(photoCollection) as Observable<
      { img: string; description: string; author: string; date: string }[]
    >;
  }

  // Opens a selected photo in a full-screen view
  openPhoto(photo: {
    img: string;
    description: string;
    author: string;
    date: string;
  }) {
    this.selectedPhoto = photo;
    this.showInfo = false;
  }

  // Closes the currently opened photo view
  closePhoto() {
    this.selectedPhoto = null;
    this.showInfo = false;
  }

  // Toggles the display of additional photo information
  toggleInfo(event: Event) {
    event.stopPropagation();
    this.showInfo = !this.showInfo;
  }

  // Opens a modal to add a new photo to the gallery
  async openAddPhotoModal() {
    const modal = await this.modalController.create({
      component: AddPhotoModalComponent,
    });

    // Handle any data returned from the modal
    modal.onDidDismiss().then((data) => {});

    await modal.present();
  }
}
