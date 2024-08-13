import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  user,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return user(this.auth).pipe(
      switchMap((userData: User | null) => {
        console.log('AuthGuard - User Data:', userData);
        if (userData) {
          console.log('Checking if user is admin with UID:', userData.uid);
          return this.checkIfAdmin(userData);
        } else {
          console.log('User not signed in, prompting Google Sign-In...');
          return from(
            signInWithPopup(this.auth, new GoogleAuthProvider())
          ).pipe(
            switchMap((credential) => {
              const signedInUser = credential.user;
              console.log('User signed in with Google:', signedInUser);
              return this.checkIfAdmin(signedInUser);
            }),
            catchError((error) => {
              console.error('Error during sign-in or admin check:', error);
              this.router.navigate(['/']);
              return of(false);
            })
          );
        }
      })
    );
  }

  private checkIfAdmin(userData: User): Observable<boolean> {
    const adminDocRef = doc(this.firestore, `admins/${userData.uid}`);
    return from(getDoc(adminDocRef)).pipe(
      map((adminDoc) => {
        console.log('Admin document found:', adminDoc.exists());
        if (adminDoc.exists()) {
          return true;
        } else {
          console.log('User is not admin, access denied');
          this.router.navigate(['/']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error fetching admin document:', error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
