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
  songs: ISong[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.subscription = this.songService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.songs = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
