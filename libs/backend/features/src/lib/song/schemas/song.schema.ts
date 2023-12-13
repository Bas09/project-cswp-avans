import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ISong, SongGenre } from '@avans-project-cswp/shared/api';
import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';

export type SongDocument = Song & Document;

@Schema()
export class Song implements ISong {
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
  duration!: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(SongGenre),
    default: SongGenre.Default,
  })
  @IsEnum(SongGenre)
  genre!: SongGenre;

  // @Prop({
  //   required: true,
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'User', // Assuming your User model is named 'User'
  // })
  // userId!: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
