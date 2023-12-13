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

export class CreateUserDto implements IUserRegistration {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  emailAddress!: string;
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
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  emailAddress?: string;
}
