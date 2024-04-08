import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@avans-project-cswp/shared/api';
//import { CheckAuthService } from './checkAuth.service';

//import { AuthService } from '@avans-project-cswp/backend/auth';

@Component({
  selector: 'avans-project-cswp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: IUser | null | undefined;
  logginStatus: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;

    if (localStorage.getItem('user')) {
      this.logginStatus = true;
    }
  }

  logout() {
    console.log('Logout clicked');
    localStorage.removeItem('user');
    this.logginStatus = false;
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
    this.logginStatus = true;
  }
}
