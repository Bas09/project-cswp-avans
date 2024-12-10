import { Id } from './id.type';
import { IUser } from './user.interface';

export interface IParty {
  _id: Id;
  partyName: string;
  creationDate: string;
  partyDate: string;
  location: string;
  attendees?: IUser[] | null;
  maxAttendees: number;
  partyDescription: string;
  partyCreatorId: IUser;
}

export type ICreateParty = Partial<Pick<IParty, '_id'>> &
  Pick<
    IParty,
    | 'partyName'
    | 'creationDate'
    | 'partyDate'
    | 'location'
    | 'attendees'
    | 'maxAttendees'
    | 'partyDescription'
    | 'partyCreatorId'
  >;
export type IUpdateParty = Partial<Omit<IParty, '_id'>>;
export type IUpsertParty = IParty;
