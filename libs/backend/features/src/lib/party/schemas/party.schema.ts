import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IParty, IUser } from '@avans-project-cswp/shared/api';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsDateString,
  ArrayNotEmpty,
} from 'class-validator';

export type PartyDocument = Party & Document;

@Schema()
export class Party implements IParty {
  @IsMongoId()
  _id!: string;

  @Prop({
    required: true,
    type: String,
  })
  partyName!: string;

  @Prop({
    required: true,
    type: String,
  })
  creationDate!: string;

  @Prop({
    required: true,
    type: String,
  })
  partyDate!: string;

  @Prop({
    required: true,
    type: String,
  })
  location!: string;

  attendees?: IUser[] | null | undefined;

  @Prop({
    required: true,
    type: Number,
  })
  maxAttendees!: number;

  @Prop({
    required: true,
    type: String,
  })
  partyDescription!: string;

  @Prop({
    required: true,
    type: String,
  })
  partyCreatorId!: IUser;
}

export const PartySchema = SchemaFactory.createForClass(Party);
