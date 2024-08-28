import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { OfferService } from '../../../services/offers/offer.service';
import { injectQuery } from '@tanstack/angular-query-experimental';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-past-activities',
  templateUrl: './past-activities.component.html',
  styleUrls: ['./past-activities.component.css'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class PastActivitiesComponent {
  fetchActivitiesQuery: any;
  stats: any;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private offer: OfferService) {
    this.chartOptions = {
      series: [
        {
          name: 'Uploads',
          data: [], // Initialize with empty data
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Past Activities(uploads)',
      },
      xaxis: {
        categories: [], // Initialize with empty categories
      },
    };

    this.fetchActivitiesQuery = injectQuery(() => ({
      queryKey: ['todayActivities'],
      queryFn: async () => {
        try {
          const data = await this.offer.getPastActivitiesStats().toPromise();
          console.log('Fetched data:', data);
          this.stats = data.data;
          console.log(data);
          // Update the chart options with the fetched data
          this.chartOptions.series = [
            {
              name: 'Activities',
              data: this.stats.map((stats: any) => stats.uploads), // Adjust based on the actual data structure
            },
          ];
          this.chartOptions.xaxis = {
            categories: this.stats.map((stats: any) => stats._id), // Adjust based on the actual data structure
          };

          return data.data;
        } catch (error) {
          console.error('Error fetching user offers:', error);
          throw error;
        }
      },
    }));
  }
}
