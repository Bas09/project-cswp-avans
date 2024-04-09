import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { IPlaylist, ISong } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';

@Component({
  selector: 'avans-project-cswp-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css'],
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: IPlaylist | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false; // Add isEdit property

  songs: ISong[] = [];

  playlistId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.playlistId = params.get('id');

      // Subscribe to the observable returned by playlistService.read
      this.subscription = this.playlistService.read(this.playlistId).subscribe({
        next: (result) => {
          this.playlist = result;

          this.canEdit = true;

          // add song name to songNames array
          if (this.playlist && this.playlist.songs) {
            // Convert the comma-separated string to an array
            const songIds = this.playlist.songs.toString().split(',');

            songIds.forEach((id) => {
              this.songService.read(id).subscribe({
                next: (song) => {
                  this.songs.push(song); // Fix: Push the song object instead of the observable

                  console.log('songs:', this.songs);
                },
                error: (error) => {
                  console.error('Error fetching song:', error);
                },
              });
            });
          }
        },
        error: (error) => {
          console.error('Error fetching playlist:', error);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    console.log('onDelete button clicked');
    if (this.playlist) {
      console.log('this.playlist exists: ', this.playlist);
      this.playlistService.deletePlaylist(this.playlist._id).subscribe(() => {
        console.log('playlist deleted', this.playlist?._id);

        // Fetch the updated playlist list after deletion
        this.playlistService.list().subscribe((playlists) => {
          // Update the playlist list in the PlaylistListComponent
          // (You may emit an event or update the playlist list as per your component architecture)
          console.log('Updated playlist list:', playlists);
        });
      });
    }

    this.router.navigate(['/playlist']);
  }
}
