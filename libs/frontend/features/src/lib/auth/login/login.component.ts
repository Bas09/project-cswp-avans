import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    const user = this.userService.validateUser(this.email, this.password);

    if (user) {
      console.log('Login successful!', user);
      // Navigate to a different page or set user session
      this.router.navigate(['/dashboard']); // Example route
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
