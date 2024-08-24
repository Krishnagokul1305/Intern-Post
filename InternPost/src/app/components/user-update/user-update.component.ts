import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent {
  updateForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.user = auth.getUserData().user;
    this.updateForm = this.fb.group({
      email: [this.user.email],
      fullName: [this.user.fullName],
      image: [null],
      phoneNo: [this.user.phoneNo],
    });

    console.log(this.user);
  }

  fileName: string | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    }
  }

  clearFile(): void {
    this.fileName = null;
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.updateForm.get('email')?.value);
    formData.append('username', this.updateForm.get('username')?.value);
    formData.append('department', this.updateForm.get('department')?.value);

    const imageFile = this.updateForm.get('image')?.value;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Example: Send formData to your backend API to update the user
    // this.http.post('/api/user/update', formData).subscribe(response => {
    //   console.log('User updated successfully');
    // });
  }
}
