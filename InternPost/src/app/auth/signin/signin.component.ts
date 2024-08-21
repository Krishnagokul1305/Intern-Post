import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthService) {
    this.signupForm = this.fb.group({
      email: [''],
      username: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    this.auth.signup(this.signupForm.value)
  }

  onGoogleSignIn() {
    console.log('Google Sign-In clicked');
  }
}
