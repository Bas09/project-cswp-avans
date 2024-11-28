// import { Id } from './id.type';

import { User } from '../user/user.model';

export enum SongGenre {
  Pop = 'pop',
  Rock = 'rock',
  HipHop = 'hiphop',
  Jazz = 'jazz',
  Country = 'country',
  ElectronicDance = 'electronic-dance',
  RnB = 'rnb',
  Classical = 'classical',
  Reggae = 'reggae',
  Metal = 'metal',
  Default = 'Default',
}

export class Song {
  _id: number = 0;
  title: string = '';
  duration: string = '';
  genre: SongGenre = SongGenre.Default;
  artistName: string = '';
  imageUrl: string = '';

  constructor(
    title: string = '',
    duration: string = '',
    genre: SongGenre = SongGenre.Default,
    userId: number = 0,
    imageUrl: string = ''
  ) {
    this.title = title;
    this.duration = duration;
    this.genre = genre;
    this.artistName
    this.imageUrl = imageUrl;
  }

  //artist: IArtist
}

// export type ICreateSong = Partial<Pick<ISong, '_id'>> &
//   Pick<ISong, 'title' | 'duration' | 'genre' | 'imageUrl'> & {
//     userId: User['_id'];
//   };

// export type IUpdateSong = Partial<Omit<ISong, '_id'>>;
// export type IUpsertSong = ISong;