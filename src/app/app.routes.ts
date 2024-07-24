import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VedettePageComponent } from './pages/vedette-page/vedette-page.component';
import { NightlifePageComponent } from './pages/nightlife-page/nightlife-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'vedette', component: VedettePageComponent },
  { path: 'nightlife', component: NightlifePageComponent },
  { path: 'Gallery', component: GalleryPageComponent },
];
