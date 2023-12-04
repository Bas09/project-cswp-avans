import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Playlist } from '../../playlist/playlist.model';
import { Observable } from 'rxjs';
import { IUser } from '@avans-project-cswp/shared/api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EditComponent } from '../../abstractions/components/edit.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'avans-project-cswp-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
})
export class UserEditComponent extends EditComponent<IUser> implements OnInit {
  constructor(userService: UserService, route: ActivatedRoute, router: Router) {
    super(userService, route, router);
  }

  // override override ngOnInit(): void {
  //     super.ngOnInit();

  //     if(this.entity._id)
  // }
}
