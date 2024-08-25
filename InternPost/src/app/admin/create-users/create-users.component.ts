import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.css',
})
export class CreateUsersComponent {
  signupForm!: FormGroup;
  isStudent = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      RegNo: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required],
      batch: [undefined],
      dep: ['', Validators.required],
    });
  }

  onRoleChange(): void {
    const role = this.signupForm.get('role')?.value;
    this.isStudent = role === 'student';

    if (!this.isStudent) {
      this.signupForm.get('batch')?.reset();
    }
  }

  createUser = injectMutation(() => ({
    mutationFn: (data: any) => this.auth.createUsers(data).toPromise(),
    onMutate: () => (this.isLoading = true),
    onSuccess: (data) => {
      this.isLoading = false;
      console.log(data);
      this.signupForm.reset();
    },
    onError: (err) => {
      this.isLoading = false;
      console.log(err);
    },
  }));

  onSubmit(): void {
    // Mark all fields as touched to trigger validation messages
    this.signupForm.markAllAsTouched();

    // Check if the form is valid before proceeding
    if (this.signupForm.invalid) {
      console.log('Form is invalid:', this.signupForm.errors);
      return;
    }

    // If the form is valid, proceed with the mutation
    this.createUser.mutate(this.signupForm.value);
  }
}
