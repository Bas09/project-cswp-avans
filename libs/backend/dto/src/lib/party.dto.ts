import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import {
  Id,
  ICreateParty,
  IUser,
  IUpsertParty,
  IUpdateParty,
} from '@avans-project-cswp/shared/api';

export class CreatePartyDto implements ICreateParty {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  partyName!: string;

  @IsString()
  @IsNotEmpty()
  creationDate!: string;

  @IsString()
  @IsNotEmpty()
  partyDate!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  attendees!: IUser[] | null;

  partyCreatorId!: IUser;

  @IsNumber()
  @IsNotEmpty()
  maxAttendees!: number;

  @IsString()
  @IsNotEmpty()
  partyDescription!: string;
}

export class UpsertPartyDto implements IUpsertParty {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  partyName!: string;

  @IsString()
  @IsNotEmpty()
  creationDate!: string;

  @IsString()
  @IsNotEmpty()
  partyDate!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  attendees!: IUser[] | null;

  partyCreatorId!: IUser;

  @IsNumber()
  @IsNotEmpty()
  maxAttendees!: number;

  @IsString()
  @IsNotEmpty()
  partyDescription!: string;
}

export class UpdatePartyDto implements IUpdateParty {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  partyName!: string;

  @IsString()
  @IsNotEmpty()
  creationDate!: string;

  @IsString()
  @IsNotEmpty()
  partyDate!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  attendees!: IUser[] | null;

  partyCreatorId!: IUser;

  @IsNumber()
  @IsNotEmpty()
  maxAttendees!: number;

  @IsString()
  @IsNotEmpty()
  partyDescription!: string;
}
