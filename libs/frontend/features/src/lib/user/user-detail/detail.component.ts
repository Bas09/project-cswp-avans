import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Deze manier is statisch: bij navigatie krijgen we niet de nieuwe id uit de URL.
    // this.userId = this.route.snapshot.paramMap.get('id');

    // Deze manier maakt gebruik van RxJs Observables.
    // We komen hier bij services en HTTP op terug.
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.user = this.userService.getUserById(Number(this.userId)); // Waarom 'Number'?
    });
  }

  delete(): void {
    console.log('Before delete - User', this.user);
    this.userService.deleteUser(this.user!);
    this.router.navigate(['/users']);
  }
}
