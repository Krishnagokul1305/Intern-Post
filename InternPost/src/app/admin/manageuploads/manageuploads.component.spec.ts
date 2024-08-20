import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageuploadsComponent } from './manageuploads.component';

describe('ManageuploadsComponent', () => {
  let component: ManageuploadsComponent;
  let fixture: ComponentFixture<ManageuploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageuploadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
