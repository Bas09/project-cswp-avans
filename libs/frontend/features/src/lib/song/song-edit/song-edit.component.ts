import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { Song, SongGenre } from '../song.model';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
})
export class SongEditComponent implements OnInit {
  song: Song = new Song();
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const songId = params.get('_id');
      if (songId) {
        this.isEditing = true;
        const song = this.songService.getSongById(Number(songId));
        if (song) {
          this.song = { ...song };
        }
      }
    });
  }



  saveSong(): void {
    if (this.isEditing) {
      this.songService.update(this.song);
    } else {
      this.songService.create(this.song);
    }
    this.router.navigate(['/songs']);
  }
}
