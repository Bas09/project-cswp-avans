import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Playlist, PublicStatus, Genre } from './playlist.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [];

  constructor() {
    console.log('Playlist.Service constructor aangeroepen');
  }

  getPlaylists(): Playlist[] {
    console.log('getPlaylists requested');
    return this.playlists;
  }

  getPlaylistsAsObservable(): Observable<Playlist[]> {
    console.log('getPlaylistsAsObservable requested');
    return of(this.playlists);
  }

  getPlaylistById(id: number): Playlist {
    console.log('getPlaylistById requested');
    return this.playlists.filter((playlist) => playlist.id === id)[0];
  }

  addPlaylist(playlist: Playlist): void {
    console.log('addPlaylist requested');

    // ensures no duplicate id's
    const maxIdNumber = Math.max(...this.playlists.map((p) => p.id), 0);
    playlist.id = maxIdNumber + 1;
    this.playlists = [...this.playlists, { ...playlist }];
    console.log('After playlist added:', this.playlists);
  }

  editPlaylist(playlist: Playlist): void {
    console.log('Before playlist is alterd', this.playlists, playlist);

    this.playlists.forEach((existingPlaylist) => {
      if (playlist.id == existingPlaylist.id) {
        console.log(
          'Before Editing playlist:',
          existingPlaylist,
          'Playlist with updated info:',
          playlist
        );

        existingPlaylist.name = playlist.name;
        existingPlaylist.genre = playlist.genre;
        existingPlaylist.publicStatus = playlist.publicStatus;

        console.log('After editing playlist:', existingPlaylist);
      }
    });
  }

  deletePlaylist(playlist: Playlist): void {
    console.log(
      'Before deletion User:',
      'All users: ',
      this.playlists,
      'User for deletion:',
      playlist
    );

    this.playlists = this.playlists.filter(
      (existingPlaylist) => existingPlaylist.id !== playlist.id
    );
  }

  private formatDate(date: Date): string {
    // Format the date to 'dd/mm/yy'
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
