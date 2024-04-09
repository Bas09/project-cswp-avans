import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { ISong, SongGenre } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Types } from 'mongoose';

@Component({
  selector: 'avans-project-cswp-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: [],
})
export class SongEditComponent implements OnInit {
  song: ISong = {} as ISong;
  isEditing = false; // Add a flag to track if editing or creating
  userId: string = '';

  title = '';
  duration = '';
  releaseDate = '';
  genre: SongGenre = SongGenre.Default;
  imageUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user') as string);
    this.userId = user._id;

    console.log('userId', this.userId);

    const songId = this.route.snapshot.paramMap.get('id');

    if (songId && songId != 'new') {
      this.isEditing = true;
      console.log('songId found', this.isEditing);
      this.songService.read(songId).subscribe((song: ISong) => {
        this.song = song;
        this.title = song.title;
        this.duration = song.duration;
        this.genre = song.genre;
        this.imageUrl = song.imageUrl;
      });
    }
  }

  saveSong() {
    console.log('Save song clicked');
    if (this.isEditing) {
      console.log('updateSong called');
      this.updateSong();
    } else {
      console.log('createSong called');
      this.createSong();
    }
  }

  updateSong() {
    console.log('Updating song clicked in song-edit.component.ts');
    console.log('Before Update', this.song);

    const updatedSong: ISong = {
      _id: this.song._id,
      title: this.song.title,
      duration: this.song.duration,
      genre: this.song.genre,
      userId: this.userId,
      imageUrl: this.song.imageUrl,
    };

    console.log('After Update', updatedSong);

    this.songService.updateSong(updatedSong).subscribe(() => {
      console.log('After Successful Update', this.song);
      this.router.navigate(['/song']);
    });
  }

  createSong() {
    console.log('Creating song clicked in song-edit.component.ts', 'TAG');
    const newSong: ISong = {
      _id: '',
      title: this.song.title,
      duration: this.song.duration,
      genre: this.song.genre,
      userId: this.userId,
      imageUrl: this.song.imageUrl,
    };
    console.log('New song', newSong);

    this.songService.createSong(newSong).subscribe(
      (response) => {
        console.log('Song created successfully', response);
        this.router.navigate(['/songs']);
      },
      (error) => {
        console.error('Error creating song:', error);
      }
    );
  }
}
