import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {
  ApexChart,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions?: ApexPlotOptions;
  colors?: string[];
};

@Component({
  selector: 'app-chart',
  imports: [NgApexchartsModule],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartData!: any;

  public chartOptions: Partial<ChartOptions> = {};

  ngOnInit() {
    this.updateChartOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("hello")
    if (changes['chartData'] && !changes['chartData'].isFirstChange()) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions() {
    if (this.chartData && this.chartData.statusStats) {
      this.chartOptions = {
        series: this.chartData.statusStats.map(
          (stats: { total: number }) => stats.total
        ) as ApexNonAxisChartSeries,
        chart: {
          width: 400,
          type: 'pie',
        } as ApexChart,
        labels: this.chartData.statusStats.map(
          (stats: { status: string }) => stats.status
        ),
        colors: ['#FF4560', '#00E396', '#008FFB'], // Set your colors here
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ] as ApexResponsive[],
      };
    }
  }
}
