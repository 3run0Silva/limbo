import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  Firestore,
  collectionData,
  collection,
  updateDoc,
  doc,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface SubmittedPhoto {
  id: string;
  imageUrl: string;
  description: string;
  author: string;
  date: string;
  approved: boolean;
}

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  photos$: Observable<SubmittedPhoto[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // Fetch submitted photos when the component initializes
    this.photos$ = this.fetchSubmittedPhotos();
  }

  fetchSubmittedPhotos(): Observable<SubmittedPhoto[]> {
    const adminCollection = collection(this.firestore, 'admin');
    return collectionData(adminCollection, { idField: 'id' }) as Observable<
      SubmittedPhoto[]
    >;
  }

  async approvePhoto(photo: SubmittedPhoto) {
    const photoDoc = doc(this.firestore, `admin/${photo.id}`);

    // Update the approval status in the admin collection
    await updateDoc(photoDoc, { approved: true }).then(() => {
      // console.log('Photo approved');
    });

    // Add the approved photo to the gallery collection
    const galleryCollection = collection(this.firestore, 'gallery');
    await addDoc(galleryCollection, {
      author: photo.author,
      description: photo.description,
      img: photo.imageUrl,
      date: new Date().toISOString(),
    })
      .then(() => {
        // console.log('Photo added to gallery');
      })
      .catch((error) => {
        console.error('Error adding photo to gallery:', error);
      });
  }

  rejectPhoto(photo: SubmittedPhoto) {
    const photoDoc = doc(this.firestore, `admin/${photo.id}`);
    updateDoc(photoDoc, { approved: false }).then(() => {
      // console.log('Photo rejected');
    });
  }
}
