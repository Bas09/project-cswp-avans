import { Playlist, Genre, PublicStatus } from '../playlist/playlist.model';

export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  guest = 'guest',
}

export class User<T> {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  emailAdress: string = '';
  role: UserRole = UserRole.guest;
  password: string = '';
  playlistsFromUser: T[] = [];

  constructor(
    firstName: string = '',
    lastName: string = '',
    emailAdress: string = '',
    playlistsFromUser: T[] = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAdress = emailAdress;
    this.playlistsFromUser = playlistsFromUser;
  }
}
