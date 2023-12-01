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
// import { Meal } from '@avans-project-cswp/backend/features';

export class CreateUserDto implements IUserRegistration {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

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
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  emailAddress!: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   meals: Meal[] = [];

  @IsString()
  @IsNotEmpty()
  role: UserRole = UserRole.Unknown;

  @IsString()
  @IsNotEmpty()
  gender: UserGender = UserGender.Unknown;
}

export class UpdateUserDto implements IUpdateUser {
  _id?: string | undefined;

  @IsString()
  @IsOptional()
  firstName!: string;
  lastName?: string;
}
