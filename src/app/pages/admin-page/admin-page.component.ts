import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  Firestore,
  collectionData,
  collection,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

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

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAdminRole();
  }

  checkAdminRole() {
    user(this.auth)
      .pipe(take(1))
      .subscribe((userData: User | null) => {
        if (userData && userData.email === 'dasilva.92.b@gmail.com') {
          this.photos$ = this.fetchSubmittedPhotos();
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  fetchSubmittedPhotos(): Observable<SubmittedPhoto[]> {
    const adminCollection = collection(this.firestore, 'admin');
    return collectionData(adminCollection, { idField: 'id' }) as Observable<
      SubmittedPhoto[]
    >;
  }

  approvePhoto(photo: SubmittedPhoto) {
    const photoDoc = doc(this.firestore, `admin/${photo.id}`);
    updateDoc(photoDoc, { approved: true }).then(() => {
      console.log('Photo approved');
    });
  }

  rejectPhoto(photo: SubmittedPhoto) {
    const photoDoc = doc(this.firestore, `admin/${photo.id}`);
    updateDoc(photoDoc, { approved: false }).then(() => {
      console.log('Photo rejected');
    });
  }
}
