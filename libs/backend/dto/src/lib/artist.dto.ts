import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDate,
  ArrayNotEmpty,
  IsDateString,
} from 'class-validator';
import {
  ICreateArtist,
  IUpdateArtist,
  IUpsertArtist,
  Id,
  ArtistGenre,
  ArtistGender,
} from '@avans-project-cswp/shared/api';

export class CreateArtistDto implements ICreateArtist {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  gender!: ArtistGender.Unknown;

  @IsString()
  @IsNotEmpty()
  nationality!: string;

  @IsString()
  @IsNotEmpty()
  biography!: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate!: string;

  @IsString()
  @IsNotEmpty()
  genre!: ArtistGenre.Default;

  @IsDateString()
  @IsOptional()
  deathDate?: string;
}

export class UpsertArtistDto implements IUpsertArtist {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  gender!: ArtistGender.Unknown;

  @IsString()
  @IsNotEmpty()
  nationality!: string;

  @IsString()
  @IsNotEmpty()
  biography!: string;

  @IsString()
  @IsNotEmpty()
  genre!: ArtistGenre.Default;

  @IsDateString()
  @IsNotEmpty()
  birthDate!: string;

  @IsOptional()
  @IsDateString()
  deathDate?: string;
}

export class UpdateArtistDto implements IUpdateArtist {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  gender!: ArtistGender.Unknown;

  @IsString()
  @IsNotEmpty()
  nationality?: string;

  @IsString()
  @IsNotEmpty()
  biography?: string;

  @IsString()
  @IsNotEmpty()
  genre!: ArtistGenre.Default;

  @IsDateString()
  @IsNotEmpty()
  birthDate?: string;

  @IsOptional()
  @IsDateString()
  deathDate?: string;
}
