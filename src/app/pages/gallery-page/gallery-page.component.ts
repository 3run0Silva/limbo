import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  photos: { img: string; description: string; author: string }[] = [];
  selectedPhoto: string | null = null;

  constructor(private firestore: Firestore) {}

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
      }));
    });
  }

  openPhoto(photoUrl: string) {
    this.selectedPhoto = photoUrl;
  }

  closePhoto() {
    this.selectedPhoto = null;
  }
}
