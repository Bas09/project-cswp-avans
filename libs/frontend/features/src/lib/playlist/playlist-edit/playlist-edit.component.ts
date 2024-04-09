import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import {
  IPlaylist,
  Genre,
  PublicStatus,
  ISong,
} from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Types } from 'mongoose';
import { SongService } from '../../song/song.service';

@Component({
  selector: 'avans-project-cswp-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: [],
})
export class PlaylistEditComponent implements OnInit {
  playlist: IPlaylist = {} as IPlaylist;
  isEditing = false;
  songs: ISong[] | null = null;
  searchTerm: string = '';
  userId: string = '';
  private subscription: Subscription | undefined;

  selectedSongs: ISong[] = [];

  title = '';
  genre = '';
  publicStatus = '';

  selectedGenres: Genre[] = Object.values(Genre); // Populate genres
  selectedPublicStatus: PublicStatus[] = Object.values(PublicStatus); // Populate public statuses

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private formBuilder: FormBuilder,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user') as string);
    this.userId = user._id;

    console.log('userId', this.userId);

    const playlistId = this.route.snapshot.paramMap.get('id');
    console.log('ngOnInit', playlistId);

    if (playlistId && playlistId !== 'new') {
      this.isEditing = true;
      console.log('playlistId found', this.isEditing);
      this.playlistService.read(playlistId).subscribe((playlist: IPlaylist) => {
        this.playlist = playlist;
        this.title = playlist.title;
        this.genre = playlist.genre;
        this.publicStatus = playlist.publicStatus;
      });
    }

    this.subscription = this.songService.list().subscribe((results) => {
      console.log('results: ', results);
      this.songs = results;
    });
  }

  isSongSelected(songId: string): boolean {
    return this.selectedSongs.some((song) => song._id === songId);
  }

  savePlaylist() {
    console.log('Save playlist clicked');
    if (this.isEditing) {
      console.log('updatePlaylist called', this.isEditing);
      this.updatePlaylist();
    } else {
      console.log('createPlaylist called', this.isEditing);
      this.createPlaylist();
    }
  }

  updatePlaylist() {
    console.log('Updating playlist clicked in playlist-edit.component.ts');
    console.log('Before Update', this.playlist);
    const updatedPlaylist: IPlaylist = {
      _id: this.playlist._id,
      title: this.playlist.title,
      description: this.playlist.description,
      genre: this.playlist.genre,
      publicStatus: this.playlist.publicStatus,
      songs: this.playlist.songs,
      userId: this.userId,
      imageUrl: this.playlist.imageUrl,
      // userId: this.playlist.userId,
    };
    console.log('After Update', updatedPlaylist);

    this.playlistService.updatePlaylist(updatedPlaylist).subscribe(() => {
      console.log('After Successful Update', this.playlist);
      this.router.navigate(['/playlists']);
    });
  }

  createPlaylist() {
    console.log(
      'Creating playlist clicked in playlist-edit.component.ts',
      'TAG'
    );

    if (this.playlist.imageUrl === '' || this.playlist.imageUrl == null) {
      this.playlist.imageUrl =
        'https://images.pexels.com/photos/35610/guitar-bass-instrument-black.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    }
    const newPlaylist: IPlaylist = {
      _id: '',
      title: this.playlist.title,
      description: this.playlist.description,
      genre: this.playlist.genre,
      publicStatus: this.playlist.publicStatus,
      userId: this.userId,
      songs: this.selectedSongs,
      imageUrl: this.playlist.imageUrl,

      // Convert selectedSongs to an array of ISong objects
      // userId: this.playlist.userId,
      // Add other properties as needed
    };
    console.log('New playlist', newPlaylist);

    this.playlistService.createPlaylist(newPlaylist).subscribe(
      (response) => {
        console.log('Playlist created successfully', response);
        this.router.navigate(['/playlists']);
      },
      (error) => {
        console.error('Error creating playlist:', error);
      }
    );
  }
}
