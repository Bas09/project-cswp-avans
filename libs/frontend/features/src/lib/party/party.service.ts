import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';

import {
  ApiResponse,
  IParty,
  ICreateParty,
} from '@avans-project-cswp/shared/api';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class PartyService {
  private endpoint = environment.dataApiUrl + '/Party';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IParty[] | null> {
    return this.http
      .get<ApiResponse<IParty[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IParty[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IParty> {
    return this.http
      .get<ApiResponse<IParty>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IParty),
        catchError(this.handleError)
      );
  }

  public createParty(party: ICreateParty, options?: any): Observable<boolean> {
    console.log('Party given to createParty() ', party);
    return this.http
      .post<ApiResponse<IParty>>(`${this.endpoint}`, party, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public updateParty(party: IParty, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<IParty>>(`${this.endpoint}/${party._id}`, party, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public removeParty(id: string, options?: any): Observable<void> {
    console.log('DELETE Party');

    return this.http
      .delete<ApiResponse<IParty>>(`${this.endpoint}/${id}`, {
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
