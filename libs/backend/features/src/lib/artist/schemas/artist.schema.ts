import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  IArtist,
  ArtistGenre,
  ArtistGender,
} from '@avans-project-cswp/shared/api';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsDateString,
  ArrayNotEmpty,
} from 'class-validator';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist implements IArtist {
  @IsMongoId()
  _id!: string;

  @Prop({
    required: true,
    type: String,
  })
  name!: string;

  @Prop({
    required: true,
    type: String,
    default: ArtistGender.None,
  })
  gender!: ArtistGender;

  @Prop({
    required: true,
    type: String,
  })
  nationality!: string;

  @Prop({
    required: true,
    type: String,
  })
  biography!: string;

  @Prop({
    required: true,
    type: String,
    default: ArtistGenre.Default,
  })
  genre!: ArtistGenre;

  @Prop({
    required: true,
    type: String,
  })
  @IsDateString()
  birthDate!: string;

  @Prop({
    type: String,
  })
  @IsOptional()
  @IsDateString()
  deathDate?: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
