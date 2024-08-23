import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  standalone:true,
  imports:[ReactiveFormsModule],
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  updateForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      email: [''],
      username: [''],
      department: [''],
      image: [null] // For storing the file
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.updateForm.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.updateForm.get('email')?.value);
    formData.append('username', this.updateForm.get('username')?.value);
    formData.append('department', this.updateForm.get('department')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Send formData to your backend API to update the user
  }
}
