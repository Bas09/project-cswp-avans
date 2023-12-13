import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import {
  IArtist,
  ArtistGenre,
  ArtistGender,
} from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: [],
})
export class ArtistEditComponent implements OnInit {
  artist: IArtist = {} as IArtist;
  isEditing = false; // Add a flag to track if editing or creating

  name = '';
  gender: ArtistGender = ArtistGender.None;
  nationality = '';
  biography = '';
  genre: ArtistGenre = ArtistGenre.Default;
  birthDate = '';
  deathDate? = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');

    if (artistId && artistId != 'new') {
      this.isEditing = true;
      console.log('artistId found', this.isEditing);
      this.artistService.read(artistId).subscribe((artist: IArtist) => {
        this.artist = artist;
        this.name = artist.name;
        this.gender = artist.gender;
        this.nationality = artist.nationality;
        this.biography = artist.biography;
        this.genre = artist.genre;
        this.birthDate = artist.birthDate;
        this.deathDate = artist.deathDate;
      });
    }
  }

  saveArtist() {
    console.log('Save artist clicked');
    if (this.isEditing) {
      console.log('updateArtist called');
      this.updateArtist();
    } else {
      console.log('createArtist called');
      this.createArtist();
    }
  }

  updateArtist() {
    console.log('Updating artist clicked in artist-edit.component.ts');
    console.log('Before Update', this.artist);

    const updatedArtist: IArtist = {
      _id: this.artist._id,
      name: this.name,
      gender: this.gender,
      nationality: this.nationality,
      biography: this.biography,
      genre: this.artist.genre,
      birthDate: this.artist.birthDate,
      deathDate: this.artist.deathDate,
    };

    console.log('After Update', updatedArtist);

    this.artistService.updateArtist(updatedArtist).subscribe(() => {
      console.log('After Successful Update', this.artist);
      this.router.navigate(['/artist']);
    });
  }

  createArtist() {
    console.log('Creating artist clicked in artist-edit.component.ts', 'TAG');
    const newArtist: IArtist = {
      _id: '',
      name: this.name,
      gender: this.gender,
      nationality: this.nationality,
      biography: this.biography,
      genre: this.genre,
      birthDate: this.birthDate,
      deathDate: this.artist.deathDate || '',
    };
    console.log('New artist', newArtist);

    this.artistService.createArtist(newArtist).subscribe(
      (response) => {
        console.log('Artist created successfully', response);
        this.router.navigate(['/artist']);
      },
      (error) => {
        console.error('Error creating artist:', error);
      }
    );
  }
}
