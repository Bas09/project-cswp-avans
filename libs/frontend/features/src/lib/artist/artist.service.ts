import { Injectable } from '@angular/core';
import { Artist, Genre } from './artist.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private artists: Artist[] = [
    {
      id: 0,
      name: 'Michael Jackson',
      country: 'United States',
      debutYear: 1964,
      genre: Genre.Rock,
    },
    {
      id: 1,
      name: 'Queen',
      country: 'United Kingdom',
      debutYear: 1971,
      genre: Genre.Rock,
    },
    {
      id: 2,
      name: 'Johnny Cash',
      country: 'United States',
      debutYear: 1954,
      genre: Genre.Country,
    },
    {
      id: 3,
      name: 'Bob Marley',
      country: 'Jamaica',
      debutYear: 1962,
      genre: Genre.Reggae,
    },
    {
      id: 4,
      name: 'Frank Sinatra',
      country: 'United States',
      debutYear: 1935,
      genre: Genre.Jazz,
    },
    {
      id: 5,
      name: 'Elvis Presley',
      country: 'United States',
      debutYear: 1954,
      genre: Genre.Rock,
    },
  ];

  constructor() {
    console.log('Artist.Service constructor');
  }

  getArtists(): Artist[] {
    console.log('getArtists requested', this.artists);
    return this.artists;
  }

  getArtistsAsObservable(): Observable<Artist[]> {
    console.log('getArtistsAsObservable requested');
    return of(this.artists);
  }

  getArtistById(id: number): Artist {
    console.log('getArtistById requested with id:', id);
    return this.artists.filter((artist) => artist.id === id)[0];
  }

  addArtist(artist: Artist): void {
    console.log('addArtist requested', artist);
    console.log('Artists array before adding:', this.artists);

    // ensures no duplicate id's
    const maxIdNumber = Math.max(...this.artists.map((u) => u.id), 0);
    artist.id = maxIdNumber + 1;

    this.artists = [...this.artists, { ...artist }];
    console.log('After adding artist:', this.artists);
  }

  editArtist(artist: Artist): void {
    console.log('Before editing artists Array:', this.artists);
    console.log('Before artist is updated:', artist);
    console.log('Genre before editing given to editArtist:', artist.genre);

    this.artists.forEach((existingArtist) => {
      if (artist.id == existingArtist.id) {
        existingArtist.name = artist.name;
        existingArtist.country = artist.country;
        existingArtist.debutYear = artist.debutYear;
        existingArtist.genre = artist.genre;

        console.log('After editing artist:', existingArtist);
      }
    });
  }

  deleteArtist(artist: Artist): void {
    console.log(
      'Artist Before deletion of a artist:',
      this.artists,
      'Artist for deletion:',
      artist
    );
    this.artists = this.artists.filter(
      (existingArtist) => existingArtist.id !== artist.id
    );
  }
}
