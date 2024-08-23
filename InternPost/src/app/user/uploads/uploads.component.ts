// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-uploads',
//   standalone: true,
//   imports: [],
//   templateUrl: './uploads.component.html',
//   styleUrl: './uploads.component.css'
// })
// export class UploadsComponent {
// constructor(){
//   console.log("user/uploads")
// }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.css',
})
export class UploadsComponent {
  form: FormGroup;
  offers: FormArray;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      rollNo: ['', Validators.required],
      dob: ['', Validators.required],
      phoneNo: ['', Validators.required],
      workingAt: ['', Validators.required],
      degree: ['', Validators.required],
      numOffers: [0, Validators.required],
      offers: this.fb.array([]),
    });

    this.offers = this.form.get('offers') as FormArray;
  }

  onOffersChange() {
    const numOffers = this.form.get('numOffers')?.value;
    this.updateOffers(numOffers);
  }

  updateOffers(numOffers: number) {
    this.offers.clear();
    for (let i = 0; i < numOffers; i++) {
      this.offers.push(
        this.fb.group({
          companyName: ['', Validators.required],
          companyType: ['', Validators.required],
          joiningDate: ['', Validators.required],
          stipend: ['', Validators.required],
          location: ['', Validators.required],
          internshipOfferLetter: [null, Validators.required],
          jobOfferLetter: [null, Validators.required],
          letterOfIntend: [null, Validators.required],
        })
      );
    }
    console.log(this.offers.controls);
  }
  

  onSubmit() {
    console.log(this.form.value); 
  }
}
