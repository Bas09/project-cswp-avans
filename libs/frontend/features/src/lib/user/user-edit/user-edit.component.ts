import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User, UserRole } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  roles = Object.values(UserRole); // For role dropdown in the template
  isEditMode = false; // Tracks if it's an edit or a new user

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route (if available)
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.isEditMode = true;
        const user = this.userService.getUserById(Number(userId));
        if (user) {
          this.user = { ...user }; // Clone user data
        }
      }
    });
  }

  saveUser(): void {
    if (this.isEditMode) {
      // Existing user
      this.userService.editUser(this.user);
    } else {
      // New user
      this.userService.addUser(this.user);
    }
    this.router.navigate(['/users']); // Redirect back to user list
  }
}
