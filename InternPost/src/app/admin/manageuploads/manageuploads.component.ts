import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { OfferService } from '../../services/offers/offer.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component'; // Import the SpinnerComponent

@Component({
  selector: 'app-manageuploads',
  standalone: true,
  imports: [PaginatorComponent, CommonModule, TableComponent, SpinnerComponent], // Include SpinnerComponent in imports
  templateUrl: './manageuploads.component.html',
  styleUrls: ['./manageuploads.component.css'],
})
export class ManageuploadsComponent implements OnInit {
  offerLetters: any[] = [];
  statusToTagName: any = {
    pending: 'bg-blue-500 text-white',
    approved: 'bg-green-500 text-white',
    rejected: 'bg-red-500 text-white',
  };
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 8; // Set your desired page size
  isLoading: boolean = false; // Add loading state

  fetchOffersQuery: any;

  constructor(private offerService: OfferService, private router: Router) {
    this.fetchOffersQuery = injectQuery(() => ({
      queryKey: ['Offers', this.currentPage],
      queryFn: async () => {
        this.isLoading = true; // Set loading to true when fetching starts
        try {
          const data = await this.offerService
            .getOffers(this.currentPage, this.pageSize)
            .toPromise();
          console.log('Fetched data:', data.data.offers, data.data.totalPages);
          this.offerLetters = data.data.offers; // Adjust based on API response structure
          this.totalPages = data.data.totalPages; // Adjust based on API response structure
          return data.data;
        } catch (error) {
          console.error('Error fetching offers:', error);
          throw error;
        } finally {
          this.isLoading = false; // Set loading to false when fetching ends
        }
      },
    }));
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.fetchOffersQuery.refetch();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOffers();
  }

  goToUploads(id: string): void {
    this.router.navigate([`admin/uploads/${id}`]);
  }
}
