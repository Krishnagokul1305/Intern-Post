import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { OfferService } from '../../services/offers/offer.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manageuploads',
  standalone: true,
  imports: [TableComponent, CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './manageuploads.component.html',
  styleUrl: './manageuploads.component.css',
})
export class ManageuploadsComponent {
  offerLetters: any = [];
  statusToTagName: any = {
    Pending: 'bg-blue-500 text-white',
    Approved: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
  };

  constructor(private offerletterService: OfferService) {
    console.log('admin/manageuploads');
  }
  ngOnInit() {
    this.offerLetters = this.offerletterService.getOffers();
  }
  toggleMenu(item: any) {
    item.showMenu = !item.showMenu;
  }
}
