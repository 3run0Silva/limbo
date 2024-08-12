import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AddPhotoModalComponent } from '../../components/add-photo-modal/add-photo-modal.component';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, IonicModule, AddPhotoModalComponent],
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  photos: { img: string; description: string; author: string; date: string }[] =
    [];
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
    this.fetchPhotos();
  }

  fetchPhotos() {
    const photoCollection = collection(this.firestore, 'gallery');
    collectionData(photoCollection).subscribe((data: any[]) => {
      this.photos = data.map((item) => ({
        img: item.img,
        description: item.description,
        author: item.author,
        date: item.date,
      }));
    });
  }

  openPhoto(photo: {
    img: string;
    description: string;
    author: string;
    date: string;
  }) {
    this.selectedPhoto = photo;
    this.showInfo = false;
  }

  closePhoto() {
    this.selectedPhoto = null;
    this.showInfo = false;
  }

  toggleInfo(event: Event) {
    event.stopPropagation();
    this.showInfo = !this.showInfo;
  }

  async openAddPhotoModal() {
    const modal = await this.modalController.create({
      component: AddPhotoModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data?.imageUrl) {
      }
    });

    await modal.present();
  }
}
