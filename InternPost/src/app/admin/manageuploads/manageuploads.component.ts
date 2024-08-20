import { Component } from '@angular/core';

@Component({
  selector: 'app-manageuploads',
  standalone: true,
  imports: [],
  templateUrl: './manageuploads.component.html',
  styleUrl: './manageuploads.component.css'
})
export class ManageuploadsComponent {
  constructor(){
    console.log("admin/manageuploads")
  }
}
