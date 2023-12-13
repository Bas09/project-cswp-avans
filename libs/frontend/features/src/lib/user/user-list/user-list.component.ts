import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-project-cswp/shared/api';
// import { ListComponent } from '../../abstractions/components/list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [],

  // standalone: true,
  // imports: [CommonModule, HttpClientModule, RouterModule],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.users = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

// @Component({
//   selector: 'avans-project-cswp-user-list',
//   templateUrl: './user-list.component.html',
//   styles: [],
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, RouterModule],
//   providers: [UserService],
// })
// export class UserListComponent extends ListComponent<IUser> {
//   constructor(userService: UserService) {
//     super(userService);
//   }
// }
