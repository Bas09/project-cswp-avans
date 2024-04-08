import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { IUser } from '@avans-project-cswp/shared/api';
import { Router } from '@angular/router';
// import { AuthService } from '@avans-project-cswp/backend/auth';

import { from } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'avans-project-cswp-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  user: IUser = {} as IUser;
  email = '';
  password = '';

  constructor(
    private userService: UserService,
    private router: Router //private authService: AuthService // Fix the parameter name to match the imported class
  ) {}
  ngOnInit(): void {}

  login() {
    console.log('Login clicked');
    const loginCredentials = {
      emailAddress: this.email,
      password: this.password,
    };
    console.log('Login credentials', loginCredentials);

    this.userService.login(loginCredentials).subscribe(
      (user: IUser | null) => {
        if (user) {
          console.log('User logged in', user);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          console.log('Error logging in');
        }
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
