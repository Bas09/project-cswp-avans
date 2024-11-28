import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() {}

  // Simulate login
  login(): void {
    this.isLoggedIn = true;
  }

  // Simulate logout
  logout(): void {
    this.isLoggedIn = false;
  }

  // Check login status
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
