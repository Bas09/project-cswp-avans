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

// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Playlist, PublicStatus, Genre } from './playlist.model';
// import { UserService } from '../user/user.service';
// // import { EntityService } from '../abstractions/services/entity.service';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '@avans-project-cswp/shared/util-env';
// import { IPlaylist } from '@avans-project-cswp/shared/api';

// @Injectable({
//   providedIn: 'root',
// })
// export class PlaylistService extends EntityService<IPlaylist> {
//   private playlists: Playlist[] = [];

//   constructor(client: HttpClient) {
//     super(client, environment.dataApiUrl, 'playlist');
//     console.log('Playlist.Service constructor aangeroepen');
//   }

//   // getPlaylists(): Playlist[] {
//   //   console.log('getPlaylists requested');
//   //   return this.playlists;
//   // }

//   // getPlaylistsAsObservable(): Observable<Playlist[]> {
//   //   console.log('getPlaylistsAsObservable requested');
//   //   return of(this.playlists);
//   // }

//   // getPlaylistById(id: number): Playlist {
//   //   console.log('getPlaylistById requested');
//   //   return this.playlists.filter((playlist) => playlist.id === id)[0];
//   // }

//   // addPlaylist(playlist: Playlist): number {
//   //   console.log('addPlaylist requested', playlist, this.playlists);
//   //   const maxIdNumber = Math.max(...this.playlists.map((p) => p.id), 0);

//   //   // ensures no duplicate id's
//   //   if (playlist.id == -1) {
//   //     playlist.id = maxIdNumber + 1;
//   //   } else {
//   //     playlist.id = maxIdNumber + 1;
//   //   }

//   //   this.playlists = [...this.playlists, { ...playlist }];
//   //   console.log('After playlist added:', playlist, this.playlists);

//   //   return playlist.id;
//   // }

//   // editPlaylist(playlist: Playlist): void {
//   //   console.log('Before playlist is alterd', this.playlists, playlist);

//   //   this.playlists.forEach((existingPlaylist) => {
//   //     if (playlist.id == existingPlaylist.id) {
//   //       console.log(
//   //         'Before Editing playlist:',
//   //         existingPlaylist,
//   //         'Playlist with updated info:',
//   //         playlist
//   //       );

//   //       existingPlaylist.name = playlist.name;
//   //       existingPlaylist.genre = playlist.genre;
//   //       existingPlaylist.publicStatus = playlist.publicStatus;

//   //       console.log('After editing playlist:', existingPlaylist);
//   //     }
//   //   });
//   // }

//   // deletePlaylist(playlist: Playlist): void {
//   //   console.log(
//   //     'Before deletion User:',
//   //     'All users: ',
//   //     this.playlists,
//   //     'User for deletion:',
//   //     playlist
//   //   );

//   //   this.playlists = this.playlists.filter(
//   //     (existingPlaylist) => existingPlaylist.id !== playlist.id
//   //   );
//   // }

//   // private formatDate(date: Date): string {
//   //   // Format the date to 'dd/mm/yy'
//   //   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   // }
// }
