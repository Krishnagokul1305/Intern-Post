import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OfferService } from '../../services/offers/offer.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from '../../components/table/table.component';
import { Router } from '@angular/router';

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
  queryClient = injectQueryClient()

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

  // Use injectQuery within the constructor
  fetchUserOffersQuery: any;

  constructor(
    private fb: FormBuilder,
    private offer: OfferService,
    private auth: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.userId = this.auth.getUserData()._id;

    this.fetchUserOffersQuery = injectQuery(() => ({
      queryKey: ['userOffers', this.userId],
      queryFn: async () => {
        try {
          const data = await this.offer.getUserOffers(this.userId).toPromise();
          console.log('Fetched data:', data);
          this.userOffers = data.data;
          return data.data;
        } catch (error) {
          console.error('Error fetching user offers:', error);
          throw error;
        }
      },
    }));

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      companyType: ['Core', Validators.required],
      joiningDate: ['', Validators.required],
      stipend: ['', Validators.required],
      location: ['', Validators.required],
      internshipOfferLetter: [null],
      jobOfferLetter: [null],
      letterOfIntent: [null],
    });
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

      Object.keys(this.files).forEach((key) => {
        if (this.files[key]) {
          formData.append(key, this.files[key]!);
        }
      });
      this.isLoading = true;
      this.uploadOffer.mutate(formData);
    }
  }

  uploadOffer = injectMutation((client) => ({
    mutationFn: (data: any) => this.offer.postOffer(data).toPromise(),
    onSuccess: (data: any) => {
      client.invalidateQueries({ queryKey: ['userOffers'] })
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
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  goToUploads(id: string) {
    console.log(id)
    this.router.navigate([`user/uploads/${id}`]);
  }
  
  toggleMenu(item: any) {
    item.showMenu = !item.showMenu;
  }
}
