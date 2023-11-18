import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 0,
      firstName: 'Eerste',
      lastName: 'User',
      emailAdress: 'usereen@host.com',
      role: UserRole.admin,
      password: '12345',
    },
    {
      id: 1,
      firstName: 'Tweede',
      lastName: 'User',
      emailAdress: 'usertwee@host.com',
      role: UserRole.guest,
      password: '12345',
    },
    {
      id: 2,
      firstName: 'Derde',
      lastName: 'User',
      emailAdress: 'userdrie@host.com',
      role: UserRole.editor,
      password: '12345',
    },
  ];

  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): User[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<User[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }

  getUserById(id: number): User {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user.id === id)[0];
  }

  addUser(user: User): void {
    console.log('Before Add User:', this.users, user);
    user.id = this.users.length + 1;
    this.users = [...this.users, { ...user }];
    console.log('After Add User:', this.users);
  }
}
