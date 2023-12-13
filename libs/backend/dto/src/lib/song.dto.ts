import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';
import {
  ICreateSong,
  IUpdateSong,
  IUpsertSong,
  Id,
  SongGenre,
} from '@avans-project-cswp/shared/api';

export class CreateSongDto implements ICreateSong {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsEnum(SongGenre)
  @IsNotEmpty()
  genre!: SongGenre;
}

export class UpsertSongDto implements IUpsertSong {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsEnum(SongGenre)
  @IsNotEmpty()
  genre!: SongGenre;
}

export class UpdateSongDto implements IUpdateSong {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  duration?: string;

  @IsEnum(SongGenre)
  @IsNotEmpty()
  genre?: SongGenre;
}
