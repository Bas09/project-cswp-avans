import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@avans-project-cswp/shared/api';

@Component({
  selector: 'avans-project-cswp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: IUser | null | undefined;
  loginString: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;

    if (localStorage.getItem('user')) {
      this.loginString = 'Logout';
    } else {
      this.loginString = 'Login';
    }
  }

  logout() {
    console.log('Logout clicked');
    localStorage.removeItem('user');
    this.loginString = 'Login';
    this.router.navigate(['/login']);
  }
}
