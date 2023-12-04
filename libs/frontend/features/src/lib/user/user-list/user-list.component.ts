import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-project-cswp/shared/api';
import { ListComponent } from '../../abstractions/components/list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [UserService],
})
export class UserListComponent extends ListComponent<IUser> {
  constructor(userService: UserService) {
    super(userService);
  }
}
