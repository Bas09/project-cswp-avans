import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IArtist,
  IPlaylist,
  ISong,
  IUser,
} from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';
import { SongService } from '../song/song.service';
import { PlaylistService } from '../playlist/playlist.service';
import { ArtistService } from '../artist/artist.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'avans-project-cswp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined = undefined;
  songs: ISong[] | null = null;
  playlists: IPlaylist[] | null = null;
  artists: IArtist[] | null = null;
  users: IUser[] | null = null;

  constructor(
    private songService: SongService,
    private playlistService: PlaylistService,
    private artistService: ArtistService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.songService.list().subscribe((songResults) => {
      console.log(`Songs: ${songResults}`);
      this.songs = songResults;
    });

    this.subscription = this.playlistService
      .list()
      .subscribe((playlistResults) => {
        console.log(`Playlist: ${playlistResults}`);
        this.playlists = playlistResults;
      });

    this.subscription = this.artistService.list().subscribe((artistResults) => {
      console.log(`Artists: ${artistResults}`);
      this.artists = artistResults;
    });

    this.subscription = this.userService.list().subscribe((userResults) => {
      console.log(`Users: ${userResults}`);
      this.users = userResults;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
