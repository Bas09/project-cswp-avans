import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Playlist } from '../../playlist/playlist.model';

@Component({
  selector: 'avans-project-cswp-user-list',
  templateUrl: './user-list.component.html',

  styles: [],
})
export class UserListComponent implements OnInit {
  users: User<Playlist>[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    console.log('Users:', this.users);
  }
}
