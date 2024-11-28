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
}

export enum PublicStatus {
  Private = 'private',
  Public = 'public',
}

export class Playlist {
  id: number = 0;
  name: string = '';
  dateCreated: Date = new Date();
  genre: Genre = Genre.Pop;
  publicStatus: PublicStatus = PublicStatus.Private;
  userId: number = 0; // New property to store the user ID

  constructor(
    name: string = '',
    genre: Genre = Genre.Pop,
    publicStatus: PublicStatus = PublicStatus.Private,
    userId: number = 0 // Add userId to constructor
  ) {
    this.name = name;
    this.genre = genre;
    this.publicStatus = publicStatus;
    this.userId = userId; // Initialize userId
  }
}
