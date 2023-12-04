import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-project-cswp/shared/api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DetailComponent } from '../../abstractions/components/detail.component';

@Component({
  selector: 'avans-project-cswp-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [UserService],
})
export class UserDetailComponent extends DetailComponent<IUser> {
  constructor(userService: UserService, route: ActivatedRoute, router: Router) {
    super(userService, route, router);
  }
}
