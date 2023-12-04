import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from './user.model';
import { Genre, Playlist, PublicStatus } from '../playlist/playlist.model';
import { PlaylistService } from '../playlist/playlist.service';
// import { EntityService } from '../../../../common/src';
import { EntityService } from '../abstractions/services/entity.service';
import { IUser } from '@avans-project-cswp/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<IUser> {
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

  constructor(client: HttpClient) {
    super(client, environment.dataApiUrl, 'users');
  }
}
