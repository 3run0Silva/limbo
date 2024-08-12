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
  photos: { img: string; description: string; author: string; date: string }[] =
    [];
  selectedPhoto: {
    img: string;
    description: string;
    author: string;
    date: string;
  } | null = null;
  showInfo = false;

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
    this.showInfo = false; // Ensure info is hidden initially
  }

  closePhoto() {
    this.selectedPhoto = null;
    this.showInfo = false; // Reset info visibility
  }

  toggleInfo(event: Event) {
    event.stopPropagation(); // Prevent closing the modal when clicking the info button
    this.showInfo = !this.showInfo;
  }
}
