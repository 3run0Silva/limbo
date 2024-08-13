import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageDescriptionPopoverComponent } from '../image-description-modal/image-description-modal.component';

describe('ImageDescriptionModalComponent', () => {
  let component: ImageDescriptionPopoverComponent;
  let fixture: ComponentFixture<ImageDescriptionPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDescriptionPopoverComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageDescriptionPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
