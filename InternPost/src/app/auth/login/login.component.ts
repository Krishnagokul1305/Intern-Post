import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { SpinnerMiniComponent } from '../../components/spinner-mini/spinner-mini.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    CommonModule,
    SpinnerMiniComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onLogin = injectMutation(() => ({
    mutationFn: (data) => this.auth.login(data).toPromise(),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.toastr.success('logged in successfully');
      this.isLoading = false;
      localStorage.setItem('user', JSON.stringify({ user: data.data }));
      localStorage.setItem('token', JSON.stringify({ token: data.token }));

      this.auth.user = data.data;
      if (data.data.role === 'student') {
        this.router.navigate(['/user/dashboard']);
      } else if (data.data.role === 'faculty') {
        this.router.navigate(['/admin/dashboard']);
      }
    },
    onError: (err) => {
      this.isLoading = false;
      this.toastr.error('Invalid email or Password');
    },
  }));

  onSubmit(): any {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      throw new Error('Please fill in all the fields');
    }
    this.onLogin.mutate(this.loginForm.value);
  }

  onGoogleSignIn() {
    console.log('Google Sign-In clicked');
  }
}
