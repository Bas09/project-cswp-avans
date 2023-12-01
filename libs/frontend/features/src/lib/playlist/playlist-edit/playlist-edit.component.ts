import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist, Genre, PublicStatus } from '../playlist.model';
import { PlaylistService } from '../playlist.service';
import { DatePipe } from '@angular/common';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-project-cswp-playlist-edit',
  templateUrl: './playlist-edit.component.html',
})
export class PlaylistEditComponent implements OnInit {
  userPlArrayId: string | null = null;
  playlist: Playlist = new Playlist();
  formattedDate: string | null = null;
  userList: User<Playlist>[] = [];
  newPlaylistName: string = '';
  userId: string | null = null;

  // Add enums for options
  genres = Object.values(Genre);
  publicStatusOptions = Object.values(PublicStatus);

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userList = this.userService.getUsers();

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.userPlArrayId = params.get('id');

      // Retrieve the state
      //const navigationState = this.router.getCurrentNavigation()?.extras.state;
      const navigationState = this.route.snapshot.paramMap.get('id');

      // Check if there is a state and if it contains userId
      if (navigationState) {
        this.userId = navigationState;
        console.log('Retrieved userId from state:', this.userId);
      } else {
        console.log('Retrieved no userId from state:', this.userId);
      }

      if (this.userPlArrayId) {
        // Existing playlist
        this.playlist = this.playlistService.getPlaylistById(
          Number(this.userPlArrayId)
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

      console.log('Selected Genre:', this.selectedGenre);
      console.log('Selected Public Status:', this.selectedPublicStatus);
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
    console.log('Selected Genre:', this.selectedGenre);
    console.log('Selected Public Status:', this.selectedPublicStatus);
    console.log('Selected Name:', this.newPlaylistName);

    if (this.userPlArrayId) {
      this.playlistService.editPlaylist(this.playlist);
      console.log('After Edit - Playlist:', this.playlist);
    } else {
      const newUserlist = [...this.userList]; // Create a copy to avoid mutation
      const newPlaylist: Playlist = {
        id: 0, // Set a temporary id; it will be updated by the service
        name: this.newPlaylistName,
        dateCreated: new Date(),
        genre: this.selectedGenre || Genre.Default, // Set a default genre if none selected
        publicStatus: this.selectedPublicStatus || PublicStatus.Default, // Set a default status if none selected
      };

      if (newUserlist.length > 0) {
        newUserlist[0].playlistsFromUser.push(newPlaylist);
        this.userList = newUserlist;
      }

      this.router.navigate(['/playlist']);
    }
  }

  delete(): void {
    console.log('Before delete - Playlist', this.playlist);
    this.playlistService.deletePlaylist(this.playlist!);
    this.router.navigate(['/playlist']);
  }
}
