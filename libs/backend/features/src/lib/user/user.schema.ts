import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import { IUser, UserGender, UserRole } from '@avans-project-cswp/shared/api';
import { IsMongoId } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @IsMongoId()
  _id!: string;

  @Prop({
    required: true,
    type: String,
  })
  name!: string;

  @Prop({
    required: false,
    type: String,
    default: UserRole.Guest,
  })
  role: UserRole = UserRole.Guest;

  @Prop({
    required: false,
    type: String,
    default: UserGender.Unknown,
  })
  gender: UserGender = UserGender.Unknown;

  @Prop({
    required: true,
    type: String,
    select: true,
    unique: true,
    // validate: {
    //     validator: isEmail,
    //     message: 'should be a valid email address'
    // }
  })
  emailAddress = '';

  @Prop({
    required: true,
    select: false,
    type: String,
  })
  password = '';

  @Prop({
    required: true,
    type: String,
  })
  imageUrl!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
