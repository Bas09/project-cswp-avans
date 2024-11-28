import { Playlist } from '../playlist/playlist.model';

export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  guest = 'guest',
}

export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  emailAdress: string = '';
  role: UserRole = UserRole.guest;
  password: string = '';
  playlists: Playlist[] = [];

  constructor(
    firstName: string = '',
    lastName: string = '',
    emailAdress: string = '',
    playlists: Playlist[] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAdress = emailAdress;
    this.playlists = playlists;
  }
}