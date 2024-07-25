import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nightlife-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './nightlife-page.component.html',
  styleUrls: ['./nightlife-page.component.scss'],
})
export class NightlifePageComponent implements OnInit {
  institutions = [
    { name: 'Bar ABC', status: 'open' },
    { name: 'Club XYZ', status: 'closed' },
  ];

  constructor() {}

  ngOnInit() {}
}
