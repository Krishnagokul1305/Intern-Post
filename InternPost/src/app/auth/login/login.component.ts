import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { injectMutation, Mutation } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onLogin = injectMutation(() => ({
    mutationFn: (data) => this.auth.login(data).toPromise(),
    onSuccess: (data: any) => {
      console.log(data);
      // Store user information in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({ token: data.token, user: data.data })
      );

      console.log(data);
      this.auth.user = data.data;

      // Redirect based on user role
      if (data.data.role === 'user') {
        console.log(data.data.role);
        this.router.navigate(['/user/dashboard']);
      } else if (data.data.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      }
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
