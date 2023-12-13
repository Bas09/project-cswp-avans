import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-project-cswp/shared/api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  users: IUser | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false; // Add isEdit property
  // user: any; // Declare user variable

  userId: string | null = null;
  user: IUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      // Subscribe to the observable returned by userService.read
      this.userService.read(this.userId).subscribe(
        (result) => {
          this.user = result;
          this.canEdit = this.user?._id === this.user?._id; // Check if user.id matches localStorage
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    console.log('onDelete button clicked');
    if (this.user) {
      console.log('this.user exists: ', this.user);
      this.userService.removeUser(this.user._id).subscribe(() => {
        console.log('user deleted', this.user?._id);

        // Fetch the updated user list after deletion
        this.userService.list().subscribe((users) => {
          // Update the user list in the UserList component
          // (You may emit an event or update the user list as per your component architecture)
          console.log('Updated user list:', users);
        });
      });
    }

    this.router.navigate(['/users']);
  }
}

// @Component({
//   selector: 'avans-project-cswp-user-detail',
//   templateUrl: './user-detail.component.html',
//   styles: [],
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, RouterModule],
//   providers: [UserService],
// })
// export class UserDetailComponent extends DetailComponent<IUser> {
//   constructor(userService: UserService, route: ActivatedRoute, router: Router) {
//     super(userService, route, router);
//   }
// }
