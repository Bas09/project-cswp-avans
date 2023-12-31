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
    {
      id: 3,
      firstName: 'Vierde',
      lastName: 'User',
      emailAdress: 'uservier@host.com',
      role: UserRole.admin,
      password: '12345',
    },
    {
      id: 4,
      firstName: 'Vijfde',
      lastName: 'User',
      emailAdress: 'uservijf@host.com',
      role: UserRole.guest,
      password: '12345',
    },
    {
      id: 5,
      firstName: 'Zesde',
      lastName: 'User',
      emailAdress: 'userzes@host.com',
      role: UserRole.editor,
      password: '12345',
    },
    {
      id: 6,
      firstName: 'Zevende',
      lastName: 'User',
      emailAdress: 'userzeven@host.com',
      role: UserRole.admin,
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

    // ensures no duplicate id's
    const maxIdNumber = Math.max(...this.users.map((u) => u.id), 0);

    user.id = maxIdNumber + 1;
    this.users = [...this.users, { ...user }];
    console.log('After Add User:', this.users);
  }

  editUser(user: User): void {
    console.log('Before Editing User:', this.users, user);

    this.users.forEach((existingUser) => {
      if (user.id == existingUser.id) {
        console.log(
          'Before Editing User:',
          existingUser,
          'User with updated info:',
          user
        );

        existingUser.emailAdress = user.emailAdress;
        existingUser.firstName = user.firstName;
        existingUser.lastName = user.lastName;
        existingUser.password = user.password;
        existingUser.role = user.role;

        console.log('After editing:', existingUser);
      }
    });
  }

  deleteUser(user: User): void {
    console.log(
      'Before deletion User:',
      'All users: ',
      this.users,
      'User for deletion:',
      user
    );
    this.users = this.users.filter(
      (existingUser) => existingUser.id !== user.id
    );
  }
}
