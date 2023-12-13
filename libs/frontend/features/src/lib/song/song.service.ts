import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';

import {
  ApiResponse,
  ISong,
  ICreateSong,
} from '@avans-project-cswp/shared/api';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class SongService {
  endpoint = environment.dataApiUrl + '/song';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<ISong[] | null> {
    return this.http
      .get<ApiResponse<ISong[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ISong[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<ISong> {
    return this.http
      .get<ApiResponse<ISong>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ISong),
        catchError(this.handleError)
      );
  }

  public createSong(song: ICreateSong, options?: any): Observable<boolean> {
    console.log('song given to createSong() ', song);
    return this.http
      .post<ApiResponse<ISong>>(`${this.endpoint}`, song, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public updateSong(song: ISong, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<ISong>>(`${this.endpoint}/${song._id}`, song, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public removeSong(id: string, options?: any): Observable<void> {
    console.log('DELETE SONG');

    return this.http
      .delete<ApiResponse<ISong>>(`${this.endpoint}/${id}`, {
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
