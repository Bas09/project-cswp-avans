import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

//import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  userId: string | null = null;
  // user: User | null = null;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        // Bestaande user
        this.user = this.userService.getUserById(Number(this.userId));
        console.log('Existing User:', this.user);
      } else {
        // Nieuwe user
        this.user = new User();
        console.log('New User:', this.user);
      }
    });
  }

  save() {
    console.log('Hier komt je save actie');
    console.log('Before Save - User:', this.user);
    if (this.userId) {
      //edit existing user
    } else {
      this.userService.addUser(this.user!);
      console.log('After Save - User:', this.user);
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
