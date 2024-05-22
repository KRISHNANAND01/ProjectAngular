import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private authService: AuthService) { }

  onLogout() {
    
    this.authService.logout();
  }

}
