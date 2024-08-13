import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NightlifeService } from '../../components/services/nighlife.service';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
} from '@angular/fire/firestore';

interface VedetteImage {
  img: string;
  description: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  openEstablishments: number = 0;
  closedEstablishments: number = 0;
  newPhotos: number = 0;
  totalPhotos: number = 0;
  mainImage: VedetteImage | undefined;

  constructor(
    private router: Router,
    private nightlifeService: NightlifeService,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // Fetches the number of open and closed establishments
    this.fetchEstablishmentStatus();

    // Fetches data related to photos in the gallery, including recent photos
    this.fetchPhotosData();

    // Fetches the main image for the home page
    this.fetchMainImage();
  }

  fetchEstablishmentStatus() {
    // Subscribes to the establishment data and calculates open and closed establishments
    this.nightlifeService.getEstablishments().subscribe((data) => {
      this.openEstablishments = data.filter((establishment) =>
        this.isOpen(establishment.openingTime, establishment.closingTime)
      ).length;
      this.closedEstablishments = data.length - this.openEstablishments;
    });
  }

  fetchPhotosData() {
    // Fetches the total number of photos in the gallery
    const photoCollection = collection(this.firestore, 'gallery');
    collectionData(photoCollection).subscribe((photos: any[]) => {
      this.totalPhotos = photos.length;

      // Fetches the number of recent photos based on the 'date' field
      const recentPhotosQuery = query(
        photoCollection,
        orderBy('date', 'desc'),
        limit(5)
      );
      collectionData(recentPhotosQuery).subscribe((recentPhotos: any[]) => {
        this.newPhotos = recentPhotos.length;
      });
    });
  }

  async fetchMainImage() {
    // Fetches the main image for the home page from the 'vedette' collection in Firestore
    const mainImageDoc = doc(this.firestore, 'vedette', 'main');
    const mainImageSnapshot = await getDoc(mainImageDoc);
    if (mainImageSnapshot.exists()) {
      this.mainImage = mainImageSnapshot.data() as VedetteImage;
    }
  }

  // Determines if an establishment is currently open based on its opening and closing times
  isOpen(openingTime: string, closingTime: string): boolean {
    const now = new Date();
    const open = new Date();
    const close = new Date();

    const [openHour, openMinute] = openingTime.split(':').map(Number);
    open.setHours(openHour, openMinute);

    const [closeHour, closeMinute] = closingTime.split(':').map(Number);
    close.setHours(closeHour, closeMinute);

    return now >= open && now <= close;
  }

  // Navigates to a different route within the app
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
