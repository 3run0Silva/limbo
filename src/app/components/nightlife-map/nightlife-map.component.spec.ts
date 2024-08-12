import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NightlifeMapComponent } from './nightlife-map.component';

describe('NightlifeMapComponent', () => {
  let component: NightlifeMapComponent;
  let fixture: ComponentFixture<NightlifeMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NightlifeMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NightlifeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
