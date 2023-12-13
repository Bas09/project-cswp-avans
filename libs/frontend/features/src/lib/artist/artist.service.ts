import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';

import {
  ApiResponse,
  IArtist,
  ICreateArtist,
} from '@avans-project-cswp/shared/api';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class ArtistService {
  private endpoint = environment.dataApiUrl + '/artist';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IArtist[] | null> {
    return this.http
      .get<ApiResponse<IArtist[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IArtist[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IArtist> {
    return this.http
      .get<ApiResponse<IArtist>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IArtist),
        catchError(this.handleError)
      );
  }

  public createArtist(
    artist: ICreateArtist,
    options?: any
  ): Observable<boolean> {
    console.log('artist given to createArtist() ', artist);
    return this.http
      .post<ApiResponse<IArtist>>(`${this.endpoint}`, artist, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public updateArtist(artist: IArtist, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<IArtist>>(`${this.endpoint}/${artist._id}`, artist, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public removeArtist(id: string, options?: any): Observable<void> {
    console.log('DELETE ARTIST');

    return this.http
      .delete<ApiResponse<IArtist>>(`${this.endpoint}/${id}`, {
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
