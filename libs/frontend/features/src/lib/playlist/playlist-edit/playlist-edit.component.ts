import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist, Genre, PublicStatus } from '../playlist.model';
import { PlaylistService } from '../playlist.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'avans-project-cswp-playlist-edit',
  templateUrl: './playlist-edit.component.html',
})
export class PlaylistEditComponent implements OnInit {
  playlistId: string | null = null;
  playlist: Playlist = new Playlist();
  formattedDate: string | null = null;

  // Add enums for options
  genres = Object.values(Genre);
  publicStatusOptions = Object.values(PublicStatus);

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.playlistId = params.get('id');
      if (this.playlistId) {
        // Existing playlist
        this.playlist = this.playlistService.getPlaylistById(
          Number(this.playlistId)
        );
        console.log('Existing playlist:', this.playlist);
      } else {
        // new playlist
        this.playlist = new Playlist();
        console.log('New Playlist:', this.playlist);
      }

      // Set the selected genre and publicStatus based on existing playlist data
      this.selectedGenre = this.playlist.genre;
      this.selectedPublicStatus = this.playlist.publicStatus;
    });

    if (this.playlist) {
      this.formattedDate = this.datePipe.transform(
        this.playlist.dateCreated,
        'dd/MM/yy'
      );
    }
  }

  selectedGenre: Genre | undefined;
  selectedPublicStatus: PublicStatus | undefined;

  save() {
    console.log('Before Save - Playlist:', this.playlist);
    if (this.playlistId) {
      this.playlistService.editPlaylist(this.playlist!);
      console.log('After Edit - Playlist:', this.playlist);
    } else {
      this.playlistService.addPlaylist(this.playlist!);
      console.log('After Save - Playlist:', this.playlist);
    }
    // this.router.navigate(['..'], { relativeTo: this.route });
    this.router.navigate(['/playlist']);
  }

  delete(): void {
    console.log('Before delete - Playlist', this.playlist);
    this.playlistService.deletePlaylist(this.playlist!);
    this.router.navigate(['/playlist']);
  }
}
