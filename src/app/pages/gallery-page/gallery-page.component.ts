import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  photos = [{ url: 'path/to/photo1.jpg' }, { url: 'path/to/photo2.jpg' }];

  constructor() {}

  ngOnInit() {}

  openPhotoUpload() {}
}
