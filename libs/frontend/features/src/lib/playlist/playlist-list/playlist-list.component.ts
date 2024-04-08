import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { IPlaylist } from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: [],
})
export class PlaylistListComponent implements OnInit, OnDestroy {
  playlists?: IPlaylist[] | null = null;
  subscription: Subscription | undefined = undefined;
  user = JSON.parse(localStorage.getItem('user') as string);
  userId = this.user._id;
  showAllPlaylists = true; // Initially show all playlists

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  loadPlaylists(): void {
    this.subscription = this.playlistService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      if (this.showAllPlaylists) {
        // Show all playlists
        this.playlists = results;
      } else {
        // Show only user's playlists
        this.playlists = results?.filter(
          (playlist) => playlist.userId === this.userId
        );
      }
    });
  }

  toggleView(): void {
    this.showAllPlaylists = !this.showAllPlaylists;
    this.loadPlaylists();
  }
}
