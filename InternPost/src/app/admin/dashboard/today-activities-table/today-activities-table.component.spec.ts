import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayActivitiesTableComponent } from './today-activities-table.component';

describe('TodayActivitiesTableComponent', () => {
  let component: TodayActivitiesTableComponent;
  let fixture: ComponentFixture<TodayActivitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayActivitiesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayActivitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
