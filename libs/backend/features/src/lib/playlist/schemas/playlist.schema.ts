import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IPlaylist, Genre, PublicStatus } from '@avans-project-cswp/shared/api';
import { IsNotEmpty, IsString, IsEnum, isMongoId } from 'class-validator';
import { IsMongoId } from 'class-validator';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist implements IPlaylist {
  @IsMongoId()
  _id!: string;

  @Prop({
    required: true,
    type: String,
  })
  title!: string;

  @Prop({
    required: true,
    type: String,
  })
  description!: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(Genre),
    default: Genre.Default,
  })
  @IsEnum(Genre)
  genre!: Genre;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(PublicStatus),
    default: PublicStatus.Default,
  })
  @IsEnum(PublicStatus)
  publicStatus!: PublicStatus;

  // @Prop({
  //   required: true,
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'User', // Assuming your User model is named 'User'
  // })
  // userId!: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
