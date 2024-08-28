import { Component } from '@angular/core';
import { OverviewBoxComponent } from "./overview-box/overview-box.component";
import { ChartComponent } from "./chart/chart.component";
import { TodayActivitiesTableComponent } from "./today-activities-table/today-activities-table.component";
import { PastActivitiesComponent } from "./past-activities/past-activities.component";
import { OfferService } from '../../services/offers/offer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [OverviewBoxComponent, ChartComponent, TodayActivitiesTableComponent, PastActivitiesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chartData: any;

  constructor(private offerService: OfferService) {}

  ngOnInit() {
    this.offerService.getOfferStats().subscribe({
      next: (data: any) => {
        console.log('Data received:', data.data.statusStats); // Logging the received data
        this.chartData = data.data;
      },
      error: (err: Error) => {
        console.error('Error fetching data:', err); // Log any errors
      },
    });
  }
}
