import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { UserService } from '../../user/user.service'; 
import { User } from '../../user/user.model'; 
import { Playlist } from '../playlist.model';

@Component({
  selector: 'avans-project-cswp-playlist-list',
  templateUrl: './playlist-list.component.html',
})
export class PlaylistListComponent implements OnInit {
  userlist: User[] = [];
  selectedUserId: number | undefined;
  playlists: Playlist[] = [];

  constructor(
    private userService: UserService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    // Fetch all users from the UserService
    this.userService.getUsers().subscribe((users) => {
      this.userlist = users;
      this.selectedUserId = this.userlist[0]?.id; // Default to the first user (or choose logic for default)
      this.loadUserPlaylists(); // Load playlists for the first user
    });
  }

  loadUserPlaylists(): void {
    if (this.selectedUserId) {
      const user = this.userlist.find((u) => u.id === this.selectedUserId);
      if (user) {
        this.playlists = user.playlists;
      }
    }
  }

  onUserChange(userId: number): void {
    this.selectedUserId = userId;
    this.loadUserPlaylists(); // Load playlists when user is changed
  }
}
