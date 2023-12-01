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

export class Playlist {
  id: number = 0;
  name: string = '';
  dateCreated: Date = new Date();
  genre: Genre = Genre.Default;
  publicStatus: PublicStatus = PublicStatus.Private;

  constructor(
    name: string = '',
    genre: Genre = Genre.Default,
    publicStatus: PublicStatus = PublicStatus.Private
  ) {
    this.name = name;
    this.genre = genre;
    this.publicStatus = publicStatus;
  }
}
