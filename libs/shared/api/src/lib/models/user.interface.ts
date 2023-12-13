// import { IEntity } from 'libs/frontend/common/src/lib/entity/entity.model';
import { IUserRegistration } from './auth.interface';
import { Id } from './id.type';

export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Guest = 'guest',
  Unknown = 'unknown',
}

export enum UserGender {
  Male = 'Male',
  Female = 'Female',
  None = 'None',
  Unknown = 'Unknown',
}

export interface IUser {
  _id: Id;
  name: string;
  role: UserRole;
  gender: UserGender;
  emailAddress: string;
  password: string;
  token?: string;
}

export interface IUserInfo extends IUserRegistration {
  _id: Id;
  role: UserRole;
  gender: UserGender;
}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
