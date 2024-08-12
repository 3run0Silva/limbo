import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NighlifeCardComponent } from './nightlife-card.component';

describe('NighlifeCardComponent', () => {
  let component: NighlifeCardComponent;
  let fixture: ComponentFixture<NighlifeCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NighlifeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NighlifeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
