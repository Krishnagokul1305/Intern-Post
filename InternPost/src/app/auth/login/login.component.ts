import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,HttpClientModule],
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

  onSubmit(): any {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      return new Error('Please fill in all the fields');
    }
  
    this.isLoading = true;
  
    this.auth.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
  
        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify({ token: res.token, user: res.data }));
  
        // Redirect based on user role
        if (res.data.role === 'user') {
          console.log(res.data.role)
          this.router.navigate(['/user/dashboard']);
        } else if (res.data.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
  

  onGoogleSignIn() {
    console.log('Google Sign-In clicked');
  }
}
