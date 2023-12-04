import { IEntity } from 'libs/frontend/common/src/lib/entity/entity.model';
import { Id } from './id.type';

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

export interface IPlaylistInfo {
  name: string;
  genre: Genre;
  publicStatus: PublicStatus;
}

export interface IPlaylist extends IEntity, IPlaylistInfo {
  _id: Id;
  dateCreated: Date;
}

export type ICreatePlaylist = IPlaylistInfo;
export type IUpdatePlaylist = Partial<Omit<IPlaylist, 'id' | 'dateCreated'>>;
export type IUpsertPlaylist = IPlaylist;
