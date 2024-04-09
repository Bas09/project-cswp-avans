import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import {
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  IUserRegistration,
  Id,
  UserRole,
  UserGender,
} from '@avans-project-cswp/shared/api';

export class CreateUserDto implements ICreateUser {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole = UserRole.Unknown;

  @IsString()
  @IsNotEmpty()
  gender!: UserGender;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}

export class UpsertUserDto implements IUpsertUser {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole = UserRole.Unknown;

  @IsString()
  @IsNotEmpty()
  gender: UserGender = UserGender.Unknown;

  @IsString()
  @IsNotEmpty()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole = UserRole.Unknown;

  @IsString()
  @IsNotEmpty()
  gender: UserGender = UserGender.Unknown;

  @IsString()
  @IsNotEmpty()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}
