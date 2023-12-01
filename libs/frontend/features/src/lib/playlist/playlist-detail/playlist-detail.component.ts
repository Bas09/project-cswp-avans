import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../playlist.model';
import { PlaylistService } from '../playlist.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-project-cswp-playlist-detail',
  templateUrl: './playlist-detail.component.html',
})
export class PlaylistDetailComponent implements OnInit {
  playlistId: string | null = null;
  userPlaylists: Playlist[] = [];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.playlistId = params.get('id');

      // Fetch the playlist
      const playlist = this.playlistService.getPlaylistById(
        Number(this.playlistId)
      );

      if (playlist) {
        // Find the associated user by email
        const user = this.userService
          .getUsers()
          .find((u) => u.playlistsFromUser.some((p) => p.id === playlist.id));

        if (user) {
          // Set user playlists
          this.userPlaylists = user.playlistsFromUser;
        }
      }
    });
  }

  delete(playlist: Playlist): void {
    console.log('Before delete - Playlist', playlist);
    this.playlistService.deletePlaylist(playlist);
    this.router.navigate(['/playlist']);
  }
}
