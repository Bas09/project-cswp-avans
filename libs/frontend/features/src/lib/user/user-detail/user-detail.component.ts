import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Playlist } from '../../playlist/playlist.model';

@Component({
  selector: 'avans-project-cswp-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user: User<Playlist> | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.user = this.userService.getUserById(Number(this.userId));
    });
  }

  delete(): void {
    console.log('Before delete - User', this.user);
    this.userService.deleteUser(this.user!);
    this.router.navigate(['/users']);
  }
}
