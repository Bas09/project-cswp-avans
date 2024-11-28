import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.list().subscribe((songs) => {
      this.songs = songs;
    });
  }
}
