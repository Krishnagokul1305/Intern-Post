import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerMiniComponent } from './spinner-mini.component';

describe('SpinnerMiniComponent', () => {
  let component: SpinnerMiniComponent;
  let fixture: ComponentFixture<SpinnerMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
