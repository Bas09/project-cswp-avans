import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from './user.model';
import { Genre, Playlist, PublicStatus } from '../playlist/playlist.model';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User<Playlist>[] = [
    {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      emailAdress: 'john.doe@example.com',
      role: UserRole.admin,
      password: 'admin123',
      playlistsFromUser: [],
    },
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      emailAdress: 'alice.smith@example.com',
      role: UserRole.guest,
      password: 'guest123',
      playlistsFromUser: [],
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Johnson',
      emailAdress: 'bob.johnson@example.com',
      role: UserRole.editor,
      password: 'editor123',
      playlistsFromUser: [],
    },
    {
      id: 3,
      firstName: 'Eva',
      lastName: 'White',
      emailAdress: 'eva.white@example.com',
      role: UserRole.admin,
      password: 'admin456',
      playlistsFromUser: [],
    },
    {
      id: 4,
      firstName: 'Charlie',
      lastName: 'Brown',
      emailAdress: 'charlie.brown@example.com',
      role: UserRole.guest,
      password: 'guest456',
      playlistsFromUser: [],
    },
    {
      id: 5,
      firstName: 'Grace',
      lastName: 'Taylor',
      emailAdress: 'grace.taylor@example.com',
      role: UserRole.editor,
      password: 'editor456',
      playlistsFromUser: [],
    },
    {
      id: 6,
      firstName: 'David',
      lastName: 'Williams',
      emailAdress: 'david.williams@example.com',
      role: UserRole.admin,
      password: 'admin789',
      playlistsFromUser: [],
    },
  ];

  constructor(private playlistService: PlaylistService) {
    // this.users.forEach((user) => {
    //   this.addPlaylistForUser(
    //     user.id,
    //     user.firstName + "'s playlist",
    //     Genre.Default,
    //     PublicStatus.Default
    //   );
    // });
    // console.log('User.Service constructor aangeroepen');
  }

  getUsers(): User<Playlist>[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<User<Playlist>[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }

  getUserById(id: number): User<Playlist> {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user.id === id)[0];
  }

  addUser(user: User<Playlist>): void {
    console.log('Before Add User:', this.users, user);

    // ensures no duplicate id's
    const maxIdNumber = Math.max(...this.users.map((u) => u.id), 0);

    user.id = maxIdNumber + 1;
    this.users = [...this.users, { ...user }];
    console.log('After Add User:', this.users);
  }

  editUser(user: User<Playlist>): void {
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

  deleteUser(user: User<Playlist>): void {
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

  addPlaylistForUser(
    userId: number,
    playlistName: string,
    genre: Genre,
    publicStatus: PublicStatus
  ): void {
    console.log(
      'Before Add Playlist for User:',
      userId,
      playlistName,
      genre,
      publicStatus
    );

    const user = this.users.find((u) => u.id === userId);

    if (user) {
      const newPlaylist: Playlist = {
        id: -1,
        name: playlistName,
        dateCreated: new Date(),
        genre: genre,
        publicStatus: publicStatus,
      };

      const playlistId = this.playlistService.addPlaylist(newPlaylist);
      newPlaylist.id = playlistId;
      user.playlistsFromUser.push(newPlaylist);

      console.log('After Add Playlist for User:', this.users);
    } else {
      console.error('User not found with ID:', userId);
    }
  }
}
