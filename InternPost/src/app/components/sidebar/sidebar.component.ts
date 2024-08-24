import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isUser: boolean = true;
  constructor(private auth: AuthService, private router: Router) {
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    this.isUser = user.user.role == 'user';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
