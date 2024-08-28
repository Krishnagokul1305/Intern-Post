import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { OfferService } from '../../../services/offers/offer.service';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";

@Component({
  selector: 'app-today-activities-table',
  standalone: true,
  imports: [TableComponent, CommonModule, SpinnerComponent],
  templateUrl: './today-activities-table.component.html',
  styleUrl: './today-activities-table.component.css',
})
export class TodayActivitiesTableComponent {
  activities: any;
  isLoading=false
  statusToTagName: any = {
    pending: 'bg-blue-500 text-white',
    approved: 'bg-green-500 text-white',
    rejected: 'bg-red-500 text-white',
  };
  fetchActivitiesQuery: any;

  constructor(private offer:OfferService) {
    this.fetchActivitiesQuery = injectQuery(() => ({
      queryKey: ['todayActiviites'],
      queryFn: async () => {
        this.isLoading=true
        try {
          const data = await this.offer.getTodayActivities().toPromise();
          console.log('Fetched data:', data);
          this.activities = data.data;
          this.isLoading=false
          return data.data;
        } catch (error) {
          this.isLoading=false
          console.error('Error fetching user offers:', error);
          throw error;
        }
      },
    }));
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
