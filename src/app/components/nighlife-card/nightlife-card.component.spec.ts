import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NightlifeCardComponent } from './nightlife-card.component';

describe('NighlifeCardComponent', () => {
  let component: NightlifeCardComponent;
  let fixture: ComponentFixture<NightlifeCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NightlifeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NightlifeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
