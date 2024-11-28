import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model'; // Make sure you import the User model

@Component({
  selector: 'avans-project-cswp-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];  // Array to hold users

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch all users when the component initializes
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
