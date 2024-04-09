import {
  Genre,
  ICreatePlaylist,
  ISong,
  IUpdatePlaylist,
  IUpsertPlaylist,
  IUser,
  Id,
  PublicStatus,
} from '@avans-project-cswp/shared/api';
import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreatePlaylistDto implements ICreatePlaylist {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Genre)
  @IsNotEmpty()
  genre!: Genre;

  @IsEnum(PublicStatus)
  @IsNotEmpty()
  publicStatus!: PublicStatus;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  songs!: ISong[] | null;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}

export class UpsertPlaylistDto implements IUpsertPlaylist {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Genre)
  @IsNotEmpty()
  genre!: Genre;

  @IsEnum(PublicStatus)
  @IsNotEmpty()
  publicStatus!: PublicStatus;

  userId!: string;

  _id!: Id;

  songs!: ISong[] | null;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}

export class UpdatePlaylistDto implements IUpdatePlaylist {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Genre)
  @IsNotEmpty()
  genre!: Genre;

  @IsEnum(PublicStatus)
  @IsNotEmpty()
  publicStatus!: PublicStatus;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}
