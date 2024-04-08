import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';
import {
  ApiResponse,
  Genre,
  ICreatePlaylist,
  IPlaylist,
  PublicStatus,
} from '@avans-project-cswp/shared/api';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class PlaylistService {
  private endpoint = environment.dataApiUrl + '/playlist';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IPlaylist[] | null> {
    return this.http
      .get<ApiResponse<IPlaylist[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IPlaylist[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IPlaylist> {
    return this.http
      .get<ApiResponse<IPlaylist>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IPlaylist),
        catchError(this.handleError)
      );
  }

  public createPlaylist(
    playlist: IPlaylist,
    options?: any
  ): Observable<boolean> {
    return this.http
      .post<ApiResponse<IPlaylist>>(`${this.endpoint}`, playlist, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  public updatePlaylist(playlist: IPlaylist, options?: any): Observable<void> {
    return this.http
      .put<ApiResponse<IPlaylist>>(
        `${this.endpoint}/${playlist._id}`,
        playlist,
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

  public deletePlaylist(id: string, options?: any): Observable<void> {
    return this.http
      .delete<ApiResponse<IPlaylist>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.result),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(error.message));
  }
}
