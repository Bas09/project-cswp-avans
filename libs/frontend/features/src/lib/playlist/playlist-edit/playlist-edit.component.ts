import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist, Genre, PublicStatus } from '../playlist.model';
import { PlaylistService } from '../playlist.service';
import { UserService } from '../../user/user.service'; // Service to fetch users
import { DatePipe } from '@angular/common';
import { User } from '../../user/user.model'; // User model

@Component({
  selector: 'avans-project-cswp-playlist-edit',
  templateUrl: './playlist-edit.component.html',
})
export class PlaylistEditComponent implements OnInit {
  playlistId: string | null = null;
  playlist: Playlist = new Playlist();
  formattedDate: string | null = null;

  // Options for genre and public status
  genres = Object.values(Genre);
  publicStatusOptions = Object.values(PublicStatus);

  // Users list and selected user
  users: User[] = [];
  selectedUserId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private userService: UserService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userService.getUsersAsObservable().subscribe((users) => {
      this.users = users;
      console.log('Fetched users:', this.users);
  
      this.route.paramMap.subscribe((params) => {
        this.playlistId = params.get('id');
        if (this.playlistId) {
          // Fetch existing playlist
          this.playlist = this.playlistService.getPlaylistById(Number(this.playlistId));
          console.log('Existing playlist:', this.playlist);
  
          // Determine the user who owns this playlist
          const user = this.users.find((u) =>
            u.playlists.some((p) => p.id === this.playlist.id)
          );
          this.selectedUserId = user?.id;
        } else {
          // New playlist
          this.playlist = new Playlist();
          console.log('New Playlist:', this.playlist);
        }
  
        // Set default values
        this.selectedGenre = this.playlist.genre;
        this.selectedPublicStatus = this.playlist.publicStatus;
      });
    });
  }
  

  selectedGenre: Genre | undefined;
  selectedPublicStatus: PublicStatus | undefined;
  save() {
    console.log('Before Save - Playlist:', this.playlist);
  
    // Ensure the users array is populated
    if (!this.users.length) {
      console.error('Users array is not populated yet.');
      return;
    }
  
    // Find the selected user
    const user = this.users.find((u) => u.id === this.selectedUserId);
    if (user) {
      // Set the userId for the playlist
      this.playlist.userId = this.selectedUserId!;
  
      // Check if this playlist already exists in the user's playlist array
      const existingPlaylistIndex = user.playlists.findIndex(p => p.id === this.playlist.id);
      if (existingPlaylistIndex === -1) {
        // If it's a new playlist, push it to the user's playlists array
        user.playlists.push(this.playlist);
      } else {
        // If the playlist exists, update it
        user.playlists[existingPlaylistIndex] = this.playlist;
      }
  
      if (this.playlistId) {
        // Edit existing playlist
        this.playlistService.editPlaylist(this.playlist);
        console.log('After Edit - Playlist:', this.playlist);
      } else {
        // Add new playlist
        this.playlistService.addPlaylist(this.playlist);
        console.log('After Save - Playlist:', this.playlist);
      }
    } else {
      console.error('Selected user not found');
      return;
    }
  
    this.router.navigate(['/playlist']);
  }
  

  delete(): void {
    console.log('Before delete - Playlist', this.playlist);

    // Remove the playlist from its associated user
    const user = this.users.find((u) => u.playlists.some((p) => p.id === this.playlist.id));
    if (user) {
      user.playlists = user.playlists.filter((p) => p.id !== this.playlist.id);
    }

    this.playlistService.deletePlaylist(this.playlist!);
    this.router.navigate(['/playlist']);
  }
}
