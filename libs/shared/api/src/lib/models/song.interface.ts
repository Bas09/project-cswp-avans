import { Id } from './id.type';
import { IUser } from './user.interface';

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

export interface ISong {
  _id: Id;
  title: string;
  duration: string;
  genre: SongGenre;
  userId: Id;

  //artist: IArtist
}

export type ICreateSong = Partial<Pick<ISong, '_id'>> &
  Pick<ISong, 'title' | 'duration' | 'genre'> & { userId: IUser['_id'] };

export type IUpdateSong = Partial<Omit<ISong, '_id'>>;
export type IUpsertSong = ISong;
