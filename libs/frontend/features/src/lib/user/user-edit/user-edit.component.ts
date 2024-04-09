import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
// import { Playlist } from '../../playlist/playlist.model';
import { Observable } from 'rxjs';
import {
  IUser,
  IUserCredentials,
  UserGender,
  UserRole,
} from '@avans-project-cswp/shared/api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { EditComponent } from '../../abstractions/components/edit.component';
import { FormsModule } from '@angular/forms';
import { Types } from 'mongoose';
import { log } from 'console';
//import { AuthService } from '@avans-project-cswp/backend/auth';
import { from } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: [],
})
export class UserEditComponent implements OnInit {
  user: IUser = {} as IUser;

  name = '';
  email = '';
  password = '';
  role: UserRole = UserRole.Unknown;
  gender: UserGender = UserGender.Unknown;
  imageUrl = '';

  isEditing = false;
  isLogin = false;
  loginFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService //  private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const login = window.location.href.includes('login');
    console.log(userId, login);

    if (login) {
      this.isLogin = true;
      console.log('is login true', this.isLogin);
    }

    if (userId && userId != 'new') {
      this.isEditing = true;
      console.log('Userid found', this.isEditing);
      this.userService.read(userId).subscribe((user: IUser) => {
        this.user = user;
        this.name = user.name;
        this.email = user.emailAddress;
        this.password = user.password;
        this.role = user.role;
        this.gender = user.gender;
        this.imageUrl = user.imageUrl;
      });
    }
  }

  saveUser() {
    console.log('Save user clicked');
    if (this.isEditing) {
      this.updateUser();
    } else if (this.isLogin) {
      //this.login();
    } else {
      //this.createUser();
    }
  }
  updateUser() {
    console.log('updating user clicked in user-edit.component.ts', 'TAG');

    // Log the current state of the user object before updating
    console.log('Before Update', this.user);

    // Create an updated user object with the changes
    const updatedUser: IUser = {
      _id: this.user._id,
      name: this.user.name,
      emailAddress: this.user.emailAddress,
      password: this.user.password,
      role: this.user.role,
      gender: this.user.gender,
      imageUrl: this.user.imageUrl,
    };

    // Log the user object after updating
    console.log('After Update', this.user);
    this.userService.updateUser(updatedUser).subscribe(() => {
      // Log the user object after the update is successful
      console.log('After Successful Update', this.user);

      // Navigate to the user details page after the update is successful
      this.router.navigate(['/users/' + this.user._id]);
    });
  }

  login() {
    console.log('logging in user clicked in user-edit.component.ts', 'TAG');
    const loginCred: IUserCredentials = {
      emailAddress: this.email,
      password: this.password,
    };

    localStorage.removeItem('user');

    this.userService.login(loginCred).subscribe(
      (user: IUser | null) => {
        if (user) {
          console.log(user, 'USER');
          localStorage.setItem('user', JSON.stringify(user));
          // this.router.navigate(['/user']);
          window.location.href = '/';
        } else {
          this.loginFailed = true;
          console.log('Login failed');
        }
      },
      (error) => {
        console.log('Unauthorized');
      }
    );
  }

  createUser() {
    console.log('creating user clicked in user-edit.component.ts', 'TAG');
    const newUser: IUser = {
      name: this.user.name,
      emailAddress: this.user.emailAddress,
      password: this.user.password,
      _id: new Types.ObjectId().toString(),
      role: this.user.role,
      gender: this.user.gender,
      imageUrl: this.user.imageUrl,
    };
    console.log('New user', newUser);

    from(this.userService.register(newUser)).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
