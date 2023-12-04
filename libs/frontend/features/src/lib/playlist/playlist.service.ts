import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Playlist, PublicStatus, Genre } from './playlist.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { EntityService } from '../abstractions/services/entity.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-project-cswp/shared/util-env';
import { IPlaylist } from '@avans-project-cswp/shared/api';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService extends EntityService<IPlaylist> {
  private playlists: Playlist[] = [];

  constructor(client: HttpClient) {
    super(client, environment.dataApiUrl, 'playlist');
    console.log('Playlist.Service constructor aangeroepen');
  }

  // getPlaylists(): Playlist[] {
  //   console.log('getPlaylists requested');
  //   return this.playlists;
  // }

  // getPlaylistsAsObservable(): Observable<Playlist[]> {
  //   console.log('getPlaylistsAsObservable requested');
  //   return of(this.playlists);
  // }

  // getPlaylistById(id: number): Playlist {
  //   console.log('getPlaylistById requested');
  //   return this.playlists.filter((playlist) => playlist.id === id)[0];
  // }

  // addPlaylist(playlist: Playlist): number {
  //   console.log('addPlaylist requested', playlist, this.playlists);
  //   const maxIdNumber = Math.max(...this.playlists.map((p) => p.id), 0);

  //   // ensures no duplicate id's
  //   if (playlist.id == -1) {
  //     playlist.id = maxIdNumber + 1;
  //   } else {
  //     playlist.id = maxIdNumber + 1;
  //   }

  //   this.playlists = [...this.playlists, { ...playlist }];
  //   console.log('After playlist added:', playlist, this.playlists);

  //   return playlist.id;
  // }

  // editPlaylist(playlist: Playlist): void {
  //   console.log('Before playlist is alterd', this.playlists, playlist);

  //   this.playlists.forEach((existingPlaylist) => {
  //     if (playlist.id == existingPlaylist.id) {
  //       console.log(
  //         'Before Editing playlist:',
  //         existingPlaylist,
  //         'Playlist with updated info:',
  //         playlist
  //       );

  //       existingPlaylist.name = playlist.name;
  //       existingPlaylist.genre = playlist.genre;
  //       existingPlaylist.publicStatus = playlist.publicStatus;

  //       console.log('After editing playlist:', existingPlaylist);
  //     }
  //   });
  // }

  // deletePlaylist(playlist: Playlist): void {
  //   console.log(
  //     'Before deletion User:',
  //     'All users: ',
  //     this.playlists,
  //     'User for deletion:',
  //     playlist
  //   );

  //   this.playlists = this.playlists.filter(
  //     (existingPlaylist) => existingPlaylist.id !== playlist.id
  //   );
  // }

  // private formatDate(date: Date): string {
  //   // Format the date to 'dd/mm/yy'
  //   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  // }
}
