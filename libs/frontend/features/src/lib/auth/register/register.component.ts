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

    if (this.user.imageUrl === '' || this.user.imageUrl == null) {
      this.user.imageUrl =
        'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png';
    }

    const newUser: IUser = {
      _id: '',
      name: this.user.name,
      emailAddress: this.user.emailAddress,
      gender: this.user.gender,
      password: this.user.password,
      role: UserRole.Guest,
      imageUrl: this.user.imageUrl,
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
