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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  gender: UserGender;
  country: string;

}

export interface IUserInfo extends IUserRegistration {
  _id: Id;
  role: UserRole;
  gender: UserGender;
}

export type ICreateUser = Pick<
  IUser,
  '_id' | 'firstName' | 'lastName' | 'email' | 'password' | 'role' | 'gender' | 'country'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
export type ILoginUser = Pick<IUser, 'email' | 'password'>;
