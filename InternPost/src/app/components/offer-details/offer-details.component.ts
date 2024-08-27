import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../../services/offers/offer.service';
import { AuthService } from '../../services/auth/auth.service';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css',
})
export class OfferDetailsComponent {
  offer: any = {};
  userId!: string;
  fetchUserOffersQuery: any;
  isModalVisible = false;
  rejectionForm: FormGroup;
  offerId: any;
  approving = false;
  rejecting = false;
  isFaculty!: boolean;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.rejectionForm = this.fb.group({
      rejectedReason: ['', Validators.required],
    });

    this.userId = this.authService.getUserData()._id;
    this.isFaculty = this.authService.getUserData().role == 'faculty';
    this.offerId = this.route.snapshot.paramMap.get('id');

    if (this.offerId) {
      this.fetchUserOffersQuery = injectQuery(() => ({
        queryKey: ['userOffers', this.offerId],
        queryFn: async () => {
          try {
            const data = await this.offerService
              .getOfferById(this.offerId)
              .toPromise();
            console.log('Fetched data:', data);
            this.offer = data.data;
            return data.data;
          } catch (error) {
            console.error('Error fetching user offers:', error);
            throw error;
          }
        },
      }));
    }
  }

  ngOnInit(): void {}

  approve = injectMutation((client) => ({
    mutationFn: (id: any) => this.offerService.approveOffer(id).toPromise(),
    onSuccess: () => {
      this.approving = false;
      this.toast.success('approved successfully');
      client.invalidateQueries({ queryKey: ['userOffers', this.offerId] });
    },
    onError: (err) => {
      console.log(err);
      this.approving = false;
      this.toast.error('problem in approving');
    },
  }));

  reject = injectMutation((client) => ({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      this.offerService.rejectOffer(id, data).toPromise(),
    onSuccess: () => {
      this.approving = false;
      this.toast.success('Rejected successfully');
      client.invalidateQueries({ queryKey: ['userOffers', this.offerId] });
    },
    onError: (err) => {
      console.log(err);
      this.approving = false;
      this.toast.error('Problem in rejecting');
    },
  }));

  onReject() {
    if (this.rejectionForm.valid) {
      console.log(this.rejectionForm.value);
      this.isModalVisible = false;
      this.reject.mutate({ id: this.offerId, data: this.rejectionForm.value });
    }
  }

  onApprove() {
    this.approving = true;
    console.log(this.offerId);
    this.approve.mutate(this.offerId);
  }
}
