import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { SpinnerMiniComponent } from '../../components/spinner-mini/spinner-mini.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    CommonModule,
    SpinnerMiniComponent,
  ],
  templateUrl: './signin.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNo: ['', Validators.required],
      batch: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      RegNo: ['', Validators.required],
      dep: ['', Validators.required],
    });
  }

  onSignup = injectMutation(() => ({
    mutationFn: (data) => this.auth.signup(data).toPromise(),
    onMutate: () => {
      this.error = '';
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.isLoading = false;
      console.log(data);
      localStorage.setItem('user', JSON.stringify({ user: data.data }));
      localStorage.setItem('token', JSON.stringify({ token: data.token }));
      this.router.navigate(['/user/dashboard']);
    },
    onError: (err) => {
      this.isLoading = false;
      console.log(err);
      this.error = err.message;
    },
  }));

  onSubmit(): any {
    if (!this.signupForm.valid) {
      throw new Error('Please fill in all the fields');
    }
    this.onSignup.mutate(this.signupForm.value);
  }

  onGoogleSignIn() {
    console.log('Google Sign-In clicked');
  }
}
