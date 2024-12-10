import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserGender } from '@avans-project-cswp/shared/api'

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}