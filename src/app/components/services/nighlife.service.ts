import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NightlifeService {
  constructor(private firestore: Firestore) {}

  getEstablishments(): Observable<any[]> {
    const placesCollection = collection(this.firestore, 'places');
    return collectionData(placesCollection, { idField: 'id' });
  }
}
