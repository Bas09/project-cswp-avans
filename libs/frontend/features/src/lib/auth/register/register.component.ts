import { Component, OnInit } from '@angular/core';
import {
  IUser,
  UserGender,
  UserRole,
} from 'libs/shared/api/src/lib/models/user.interface';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-login',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  user: IUser = {} as IUser;
  name = '';
  email = '';
  password = '';
  gender: UserGender = UserGender.Unknown;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    console.log('Register clicked');

    const newUser: IUser = {
      _id: '',
      name: this.user.name,
      emailAddress: this.user.emailAddress,
      gender: this.user.gender,
      password: this.user.password,
      role: UserRole.Guest,
    };
    console.log('New user', newUser);

    this.userService.createUser(newUser).subscribe(
      (response) => {
        console.log('User created', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
  }
}
