import { Component, OnDestroy, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { ISong } from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: [],
})
export class SongListComponent implements OnInit, OnDestroy {
  songs?: ISong[] | null = null;
  subscription: Subscription | undefined = undefined;
  user = JSON.parse(localStorage.getItem('user') as string);
  userId = this.user._id;
  showAllSongs = true;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  loadSongs(): void {
    this.subscription = this.songService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      if (this.showAllSongs) {
        // Show all playlists
        this.songs = results;
      } else {
        // Show only user's playlists
        this.songs = results?.filter(
          (playlist) => playlist.userId === this.userId
        );
      }
    });
  }

  toggleView(): void {
    this.showAllSongs = !this.showAllSongs;
    this.loadSongs();
  }

  // ngOnInit(): void {
  //   this.subscription = this.songService.list().subscribe((results) => {
  //     console.log(`results: ${results}`);
  //     this.songs = results;
  //   });

  // }
}
