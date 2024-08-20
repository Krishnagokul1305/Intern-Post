import { Component } from '@angular/core';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.css'
})
export class UploadsComponent {
constructor(){
  console.log("user/uploads")
}
}
