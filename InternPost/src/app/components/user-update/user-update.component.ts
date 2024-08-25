import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { injectMutation } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent {
  updateForm: FormGroup;
  passwordForm: FormGroup;
  user: any;
  fileName: string | null = null;
  isLoading: boolean = false;
  isPasswordError:boolean=false

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.user = auth.getUserData();
    
    this.updateForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      fullName: [this.user.fullName, [Validators.required, Validators.minLength(3)]],
      avatar: [null],
      phoneNo: [
        this.user.phoneNo,
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
    });

    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // File handling methods remain the same
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;

      this.updateForm.patchValue({
        avatar: file,
      });

      this.updateForm.get('avatar')?.markAsDirty();
      this.updateForm.get('avatar')?.markAsTouched();
    }
  }

  clearFile(): void {
    this.fileName = null;
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) {
      input.value = '';
    }

    this.updateForm.patchValue({
      avatar: null,
    });

    this.updateForm.get('avatar')?.markAsPristine();
    this.updateForm.get('avatar')?.markAsUntouched();
  }

  // Mutation functions remain the same
  updateUser = injectMutation(() => ({
    mutationFn: (data: FormData) =>
      this.auth.updateUserDetails(data).toPromise(),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.isLoading = false;
      localStorage.setItem('user', JSON.stringify({ user: data.data }));
    },
    onError: (err) => {
      this.isLoading = false;
    },
  }));

  updatePassword = injectMutation(() => ({
    mutationFn: (data: any) => this.auth.updateUserPassword(data).toPromise(),
    onMutate: () => {
      this.isLoading = true;
    },
    onSuccess: (data: any) => {
      this.isLoading = false;
      console.log(data);
      localStorage.setItem('token', JSON.stringify({ token: data.token }));
    },
    onError: (err) => {
      this.isLoading = false;
      console.log(err);
    },
  }));

  userDetailsUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('email', this.updateForm.get('email')?.value);
    formData.append('fullName', this.updateForm.get('fullName')?.value);
    formData.append('phoneNo', this.updateForm.get('phoneNo')?.value);

    const avatarFile = this.updateForm.get('avatar')?.value;
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    if (
      this.updateForm.value.email === this.user.email &&
      this.updateForm.value.fullName === this.user.fullName &&
      this.updateForm.value.phoneNo === this.user.phoneNo
    ) {
      return;
    }

    this.updateUser.mutate(formData);
  }

  userPasswordUpdate() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const data = {
      newPassword: this.passwordForm.value.new_password,
      currentPassword: this.passwordForm.value.old_password,
    };

    this.updatePassword.mutate(data);
  }
}
