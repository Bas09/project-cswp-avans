import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';
import {
  ICreateSong,
  IUpdateSong,
  IUpsertSong,
  Id,
  SongGenre,
} from '@avans-project-cswp/shared/api';

export class CreateSongDto implements ICreateSong {
  _id?: string | undefined;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsEnum(SongGenre)
  @IsNotEmpty()
  genre!: SongGenre;

  @IsString()
  @IsNotEmpty()
  userId!: string;
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

  @IsString()
  @IsNotEmpty()
  userId!: string;
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
