import { Component, OnInit } from '@angular/core';
import { Playlist } from '../playlist.model';
import { PlaylistService } from '../playlist.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-project-cswp-user-list',
  templateUrl: './playlist-list.component.html',
  styles: [],
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  userlist: User<Playlist>[] = [];

  constructor(
    private playlistService: PlaylistService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.playlistService.getPlaylistsAsObservable().subscribe((playlists) => {
      this.playlists = playlists;
      console.log('Playlists:', this.playlists);
    });

    this.userlist = this.userService.getUsers();
    console.log('Users:', this.userlist);
  }
}
