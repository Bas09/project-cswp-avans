import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { Song } from '../song.model';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
})
export class SongDetailComponent implements OnInit {
  song: Song | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.songService.read(id).subscribe((song) => {
      this.song = song || null;
    });
  }

  deleteSong(): void {
    if (this.song) {
      this.songService.remove(this.song._id);
      this.router.navigate(['/songs']);
    }
  }
}
