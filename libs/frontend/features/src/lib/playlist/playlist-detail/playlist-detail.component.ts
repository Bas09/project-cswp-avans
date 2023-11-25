import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../playlist.model';
import { PlaylistService } from '../playlist.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'avans-project-cswp-playlist-detail',
  templateUrl: './playlist-detail.component.html',
})
export class PlaylistDetailComponent implements OnInit {
  playlistId: string | null = null;
  playlist: Playlist | null = null;
  formattedDate: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.playlistId = params.get('id');
      this.playlist = this.playlistService.getPlaylistById(
        Number(this.playlistId)
      );
    });

    // if (this.playlist) {
    //   this.formattedDate = this.datePipe.transform(
    //     this.playlist.dateCreated,
    //     'dd/MM/yy'
    //   );
    // }
  }

  delete(): void {
    console.log('Before delete - Playlist', this.playlist);
    this.playlistService.deletePlaylist(this.playlist!);
    this.router.navigate(['/playlist']);
  }
}
