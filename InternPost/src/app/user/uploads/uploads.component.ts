import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferService } from '../../services/offers/offer.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TableComponent],
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})


export class UploadsComponent implements OnInit {
  form!: FormGroup;
  showForm = false;
  isLoading: boolean = false;
  userId!: string;

  files: { [key: string]: File | null } = {
    internshipOfferLetter: null,
    jobOfferLetter: null,
    letterOfIntent: null,
  };

  statusToTagName: any = {
    pending: 'bg-blue-500 text-white',
    approved: 'bg-green-500 text-white',
    rejected: 'bg-red-500 text-white',
  };

  userOffers: any;

  constructor(
    private fb: FormBuilder,
    private offer: OfferService,
    private auth: AuthService,
    private toast: ToastrService
  ) {
   
  }

  ngOnInit(): void {
    this.userId = this.auth.getUserData()._id;
    this.isLoading = true;

    this.offer.getUserOffers(this.userId).subscribe({
      next: (data: any) => {
        this.userOffers = data.data;
        console.log(this.userOffers);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching user offers:', error);
        this.isLoading = false;
      }
    });

    // If you want to manage loading state manually
    this.isLoading = true;
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files[controlName] = input.files[0];
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('companyName', this.form.get('companyName')?.value);
      formData.append('companyType', this.form.get('companyType')?.value);
      formData.append('joiningDate', this.form.get('joiningDate')?.value);
      formData.append('stipend', this.form.get('stipend')?.value);
      formData.append('location', this.form.get('location')?.value);
      formData.append('student', this.userId);

      Object.keys(this.files).forEach(key => {
        if (this.files[key]) {
          formData.append(key, this.files[key]!);
        }
      });

      this.uploadOffer.mutate(formData);
    }
  }

  uploadOffer = injectMutation(() => ({
    mutationFn: (data: any) => this.offer.postOffer(data).toPromise(),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      console.log(data);
      this.isLoading = false;
      this.showForm = false;
      this.form.reset();
      this.files = {
        internshipOfferLetter: null,
        jobOfferLetter: null,
        letterOfIntent: null,
      };
      this.toast.success('Offer uploaded successfully');
    },
    onError: (err) => {
      this.isLoading = false;
      console.log(err);
      this.toast.error('Error uploading');
    },
  }));

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    // Extract the components of the date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    // Format as MM/DD/YYYY
    return `${day}/${month}/${year}`;
  }

  toggleMenu(item: any) {
    item.showMenu = !item.showMenu;
  }
}
