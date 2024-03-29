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
  // userId: string | null = null;
  // user: IUser | null = null;
  user: IUser = {} as IUser;

  name = '';
  email = '';
  password = '';
  role: UserRole = UserRole.Unknown;
  gender: UserGender = UserGender.Unknown;
  isEditing = false; // Add a flag to track if editing or creating
  isLogin = false;
  loginFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) //  private authService: AuthService
  {}

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
    };
    console.log('New user', newUser);

    from(this.userService.register(newUser)).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  // this.route.paramMap.subscribe((params) => {
  //   this.userId = params.get('id');
  //   if (this.userId) {
  //     // Bestaande user
  //     this.user = this.userService.read(this.userId);
  //     console.log('Existing User:', this.user);
  //   } else {
  //     // Nieuwe user
  //     this.user = new User();
  //     console.log('New User:', this.user);
  //   }
  // });
}

// save() {
//   console.log('Before Save - User:', this.user);
//   if (this.userId) {
//     this.userService.editUser(this.user!);
//     console.log('After Edit - User:', this.user);
//   } else {
//     this.userService.addUser(this.user!);
//     console.log('After Save - User:', this.user);
//   }
//   // this.router.navigate(['..'], { relativeTo: this.route });
//   this.router.navigate(['/users']);
// }

//   user!: IUser;

//   ngOnInit() {
//     const userId = this.route.snapshot.paramMap.get('id');
//     const login = window.location.href.includes('login');

//     if (login) {
//       this.isLogin = true;
//     }

//     if (userId) {
//       this.isEditing = true;
//       this.userService.read(userId).subscribe((user: IUser) => {
//         this.user = user;
//         this.name = user.name;
//         this.email = user.emailAddress;
//         this.password = user.password;
//       });
//     }
//   }

//   saveUser() {
//     console.log('Save user clicked', 'tag');
//     if (this.isEditing) {
//       this.updateUser();
//     } else if (this.isLogin) {
//       this.login();
//     } else {
//       this.createUser();
//     }
//   }

//   updateUser() {
//     console.log('updating user clicked in user-edit.component.ts', 'TAG');

//     const updatedUser: IUser = {
//       _id: this.user._id,
//       name: this.name,
//       emailAddress: this.email,
//       password: this.user.password,
//       role: UserRole.Unknown,
//       gender: UserGender.Unknown,
//     };
//     this.userService.updateUser(updatedUser).subscribe(() => {
//       this.router.navigate(['/user/' + this.user._id]);
//     });
//   }

//   login() {
//     console.log('logging in user clicked in user-edit.component.ts', 'TAG');
//     const loginCred: IUserCredentials = {
//       emailAddress: this.email,
//       password: this.password,
//     };

//     localStorage.removeItem('user');

//     this.userService.login(loginCred).subscribe(
//       (user: IUser | null) => {
//         if (user) {
//           console.log(user, 'USER');
//           localStorage.setItem('user', JSON.stringify(user));
//           // this.router.navigate(['/user']);
//           window.location.href = '/';
//         } else {
//           this.loginFailed = true;
//           console.log('Login failed');
//         }
//       },
//       (error) => {
//         console.log('Unauthorized');
//       }
//     );
//   }

//   createUser() {
//     console.log('creating user clicked in user-edit.component.ts', 'TAG');
//     const newUser: IUser = {
//       name: this.name,
//       emailAddress: this.email,
//       password: this.password,
//       _id: new Types.ObjectId().toString(),
//       role: UserRole.Unknown,
//       gender: UserGender.Unknown,
//     };
//     this.userService.register(newUser).subscribe(() => {
//       this.router.navigate(['/user']);
//     });
//   }
// }

// @Component({
//   selector: 'avans-project-cswp-user-edit',
//   templateUrl: './user-edit.component.html',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
// })
// export class UserEditComponent extends EditComponent<IUser> implements OnInit {
//   constructor(userService: UserService, route: ActivatedRoute, router: Router) {
//     super(userService, route, router);
//   }

//   // override override ngOnInit(): void {
//   //     super.ngOnInit();

//   //     if(this.entity._id)
//   // }
// }
