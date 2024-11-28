import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from './user.model';
import { Genre, Playlist, PublicStatus } from '../playlist/playlist.model';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      emailAdress: 'john.doe@example.com',
      role: UserRole.admin,
      dateOfBirth: '1990-01-01',
      password: 'admin123',
      playlists: [
        new Playlist('John’s Favorites', Genre.Rock, PublicStatus.Public, 0),
        new Playlist('Workout Mix', Genre.ElectronicDance, PublicStatus.Private, 0),
      ],
    },
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      emailAdress: 'jane.doe@example.com',
      role: UserRole.editor,
      dateOfBirth: '1995-01-01',
      password: 'editor123',
      playlists: [
        new Playlist('Relaxing Tunes', Genre.Jazz, PublicStatus.Public, 1),
      ],
    },
    {
      id: 2,
      firstName: 'Alice',
      lastName: 'Smith',
      emailAdress: 'alice.smith@example.com',
      role: UserRole.editor,
      dateOfBirth: '1988-06-15',
      password: 'user123',
      playlists: [
        new Playlist('Top Hits', Genre.Pop, PublicStatus.Private, 2),
        new Playlist('Party Playlist', Genre.HipHop, PublicStatus.Public, 2),
      ],
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      emailAdress: 'bob.johnson@example.com',
      role: UserRole.editor,
      dateOfBirth: '1992-11-25',
      password: 'secure123',
      playlists: [
        new Playlist('Road Trip', Genre.Country, PublicStatus.Public, 3),
      ],
    },
    {
      id: 4,
      firstName: 'Eve',
      lastName: 'Taylor',
      emailAdress: 'eve.taylor@example.com',
      role: UserRole.editor,
      dateOfBirth: '1990-03-20',
      password: 'edit456',
      playlists: [
        new Playlist('Chill Vibes', Genre.RnB, PublicStatus.Private, 4),
        new Playlist('Classical Favorites', Genre.Classical, PublicStatus.Public, 4),
      ],
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Brown',
      emailAdress: 'charlie.brown@example.com',
      role: UserRole.admin,
      dateOfBirth: '1985-12-30',
      password: 'admin456',
      playlists: [
        new Playlist('Retro Hits', Genre.Metal, PublicStatus.Public, 5),
        new Playlist('Reggae Rhythms', Genre.Reggae, PublicStatus.Private, 5),
      ],
    },
  ];

  constructor(private playlistService: PlaylistService) {
    this.users.forEach((user) => {
      this.addPlaylistForUser(
        user.id,
        user.firstName + "'s playlist",
        Genre.Classical,
        PublicStatus.Public
      );
    });

    console.log('User.Service constructor aangeroepen');
  }

  getUsers(): Observable<User[]> {
    console.log('getUsers called');
    return of(this.users); // Wrap the plain array in an observable
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

  validateUser(email: string, password: string): User | null {
    const user = this.users.find(
      (u) => u.emailAdress === email && u.password === password
    );

    if (user) {
      console.log('User validated successfully:', user);
      return user;
    } else {
      console.error('Invalid credentials');
      return null;
    }
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
        id: 0,
        name: playlistName,
        dateCreated: new Date(),
        genre: genre,
        publicStatus: publicStatus,
        userId: userId,  // Ensure the userId is assigned to the playlist
      };

      // Add playlist to user
      user.playlists.push(newPlaylist);

      console.log('After Add Playlist for User:', this.users);
    } else {
      console.error('User not found with ID:', userId);
    }
  }

}
