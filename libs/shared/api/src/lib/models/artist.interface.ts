import { Id } from './id.type';

export enum ArtistGenre {
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

export enum ArtistGender {
  Male = 'Male',
  Female = 'Female',
  None = 'None',
  Unknown = 'Unknown',
}

export interface IArtist {
  _id: Id;
  name: string;
  gender: ArtistGender;
  nationality: string;
  biography: string;
  genre: ArtistGenre;
  birthDate: string;
  deathDate?: string;
}

export type ICreateArtist = Partial<Pick<IArtist, '_id'>> &
  Pick<
    IArtist,
    | 'name'
    | 'gender'
    | 'nationality'
    | 'biography'
    | 'genre'
    | 'birthDate'
    | 'deathDate'
  >;
export type IUpdateArtist = Partial<Omit<IArtist, '_id'>>;
export type IUpsertArtist = IArtist;
