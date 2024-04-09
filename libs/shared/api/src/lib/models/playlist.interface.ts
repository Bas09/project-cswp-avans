import { Id } from './id.type';
import { ISong } from './song.interface';
import { IUser } from './user.interface';

export enum Genre {
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

export enum PublicStatus {
  Private = 'private',
  Public = 'public',
  Default = 'Default',
}

export interface IPlaylist {
  _id: Id;
  title: string;
  description: string;
  genre: Genre;
  publicStatus: PublicStatus;
  songs?: ISong[] | null;
  userId: Id;
  imageUrl?: string;
  // songs: ISong[] | null;
}

export type ICreatePlaylist = Partial<Pick<IPlaylist, '_id'>> &
  Pick<
    IPlaylist,
    'title' | 'description' | 'genre' | 'publicStatus' | 'songs' | 'imageUrl'
  > & { userId: IUser['_id'] };

export type IUpdatePlaylist = Partial<Omit<IPlaylist, '_id'>>;
export type IUpsertPlaylist = IPlaylist;
