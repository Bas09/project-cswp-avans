import { Component } from '@angular/core';
import { AuthService } from '../../../../features/src/lib/auth/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  login(): void {
    this.authService.login();
    this.router.navigate(['/login']); 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); 
  }
}
