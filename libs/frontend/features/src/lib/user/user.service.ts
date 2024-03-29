import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
// import { PlaylistService } from '../playlist/playlist.service';
// // import { EntityService } from '../../../../common/src';
// import { EntityService } from '../abstractions/services/entity.service';
import {
  ApiResponse,
  ICreateUser,
  IUser,
  IUserCredentials,
} from '@avans-project-cswp/shared/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class UserService {
  endpoint = environment.dataApiUrl + '/user';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IUser[] | null> {
    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IUser> {
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public createUser(user: ICreateUser, options?: any): Observable<boolean> {
    console.log('user given to createUser() ', user);
    return this.http
      .post<ApiResponse<IUser>>(`${this.endpoint}`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public login(user: IUserCredentials, options?: any): Observable<IUser> {
    return this.http
      .post<ApiResponse<IUser>>(`${environment.dataApiUrl}/auth/login`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: ApiResponse<IUser>) => response.results as IUser),
        catchError(this.handleError)
      );
  }
  public register(user: IUser, options?: any): Observable<boolean> {
    return this.http
      .post<ApiResponse<IUser>>(
        `${environment.dataApiUrl}/auth/register`,
        user,
        {
          ...options,
          ...httpOptions,
        }
      )
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }
  public updateUser(user: IUser, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public removeUser(id: string, options?: any): Observable<void> {
    console.log('DELETE USER');

    return this.http
      .delete<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.result),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(error.message));
  }
}

// @Injectable()
// export class UserService extends EntityService<IUser> {

//   constructor(client: HttpClient) {
//     super(client, environment.dataApiUrl, 'users');
//   }
// }

// private users: User<Playlist>[] = [
//   {
//     id: 0,
//     firstName: 'John',
//     lastName: 'Doe',
//     emailAdress: 'john.doe@example.com',
//     role: UserRole.admin,
//     password: 'admin123',
//     playlistsFromUser: [],
//   },
//   {
//     id: 1,
//     firstName: 'Alice',
//     lastName: 'Smith',
//     emailAdress: 'alice.smith@example.com',
//     role: UserRole.guest,
//     password: 'guest123',
//     playlistsFromUser: [],
//   },
//   {
//     id: 2,
//     firstName: 'Bob',
//     lastName: 'Johnson',
//     emailAdress: 'bob.johnson@example.com',
//     role: UserRole.editor,
//     password: 'editor123',
//     playlistsFromUser: [],
//   },
//   {
//     id: 3,
//     firstName: 'Eva',
//     lastName: 'White',
//     emailAdress: 'eva.white@example.com',
//     role: UserRole.admin,
//     password: 'admin456',
//     playlistsFromUser: [],
//   },
//   {
//     id: 4,
//     firstName: 'Charlie',
//     lastName: 'Brown',
//     emailAdress: 'charlie.brown@example.com',
//     role: UserRole.guest,
//     password: 'guest456',
//     playlistsFromUser: [],
//   },
//   {
//     id: 5,
//     firstName: 'Grace',
//     lastName: 'Taylor',
//     emailAdress: 'grace.taylor@example.com',
//     role: UserRole.editor,
//     password: 'editor456',
//     playlistsFromUser: [],
//   },
//   {
//     id: 6,
//     firstName: 'David',
//     lastName: 'Williams',
//     emailAdress: 'david.williams@example.com',
//     role: UserRole.admin,
//     password: 'admin789',
//     playlistsFromUser: [],
//   },
// ];
