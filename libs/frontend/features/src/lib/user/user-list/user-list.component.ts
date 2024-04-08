import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  myUser: IUser | null = null;
  subscription: Subscription | undefined = undefined;
  subscription1: Subscription | undefined = undefined;
  user = JSON.parse(localStorage.getItem('user') as string);
  userId = this.user._id;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.users = results;
    });
    this.subscription1 = this.userService
      .read(this.userId)
      .subscribe((results) => {
        this.myUser = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
