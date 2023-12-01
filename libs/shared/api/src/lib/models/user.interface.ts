import { IEntity } from 'libs/frontend/common/src/lib/entity/entity.model';
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

export interface IUserIdentity extends IEntity {
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: UserRole;
  token?: string;
}

export interface IUserInfo extends IUserRegistration {
  _id: Id;
  role: UserRole;
  gender: UserGender;
}

export interface IUser extends IUserInfo {}

export type ICreateUser = Pick<
  IUser,
  'firstName' | 'lastName' | 'password' | 'emailAddress'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
