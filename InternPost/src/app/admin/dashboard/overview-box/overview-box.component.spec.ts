import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewBoxComponent } from './overview-box.component';

describe('OverviewBoxComponent', () => {
  let component: OverviewBoxComponent;
  let fixture: ComponentFixture<OverviewBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
