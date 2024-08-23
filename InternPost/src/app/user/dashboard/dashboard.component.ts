import { Component } from '@angular/core';
import { ProfileCardComponent } from "../../components/profile-card/profile-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(){
    console.log("user/dashboard")
  }
}
