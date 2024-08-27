import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { OfferService } from '../../services/offers/offer.service';
import { CommonModule } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageuploads',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './manageuploads.component.html',
  styleUrl: './manageuploads.component.css',
})
export class ManageuploadsComponent {
  offerLetters: any = [];
  statusToTagName: any = {
    pending: 'bg-blue-500 text-white',
    approved: 'bg-green-500 text-white',
    rejected: 'bg-red-500 text-white',
  };
  userId!: string;
  fetchOffersQuery: any;

  constructor(private offerService: OfferService, private router: Router) {
    this.fetchOffersQuery = injectQuery(() => ({
      queryKey: ['Offers'],
      queryFn: async () => {
        try {
          const data = await this.offerService.getOffers().toPromise();
          console.log('Fetched data:', data);
          this.offerLetters = data.data;
          return data.data;
        } catch (error) {
          console.error('Error fetching user offers:', error);
          throw error;
        }
      },
    }));
  }

  goToUploads(id: string) {
    console.log(id);
    this.router.navigate([`admin/uploads/${id}`]);
  }
}
