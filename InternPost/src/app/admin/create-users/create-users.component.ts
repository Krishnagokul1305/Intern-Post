import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.css',
})
export class CreateUsersComponent {
  signupForm!: FormGroup;
  isStudent = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      reg_no: [''],
      name: [''],
      email: [''],
      phone_no: [''],
      password: [''],
      confirm_password: [''],
      role: [''],
      batch: [''],
      dummy: [''],
    });
  }

  onRoleChange(): void {
    const role = this.signupForm.get('role')?.value;
    this.isStudent = role === 'Student';

    if (!this.isStudent) {
      this.signupForm.get('batch')?.reset();
      this.signupForm.get('dummy')?.reset();
    }
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
}
