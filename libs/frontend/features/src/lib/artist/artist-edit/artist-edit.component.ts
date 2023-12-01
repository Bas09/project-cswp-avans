import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist, Genre } from '../artist.model';
import { ArtistService } from '../artist.service';

//import { RouterLink } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-artist-edit',
  templateUrl: './artist-edit.component.html',
})
export class ArtistEditComponent implements OnInit {
  artistId: string | null = null;
  artist: Artist = new Artist();
  genres = Object.values(Genre);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id');
      if (this.artistId) {
        // Bestaande user
        this.artist = this.artistService.getArtistById(Number(this.artistId));
        console.log('Existing Artist:', this.artist);
      } else {
        // Nieuwe user
        this.artist = new Artist();
        console.log('New Artist:', this.artist);
      }

      this.selectedGenre = this.artist.genre;

      console.log('Selected Genre:', this.selectedGenre);
    });
  }

  selectedGenre: Genre | undefined;

  save() {
    console.log('Before Save - Artist:', this.artist);
    console.log('Selected Name:', this.artist.name);
    console.log('Selected Country:', this.artist.country);
    console.log('Selected DebutYear:', this.artist.debutYear);
    console.log('Selected Genre:', this.selectedGenre);

    this.artist.genre = this.selectedGenre!;

    if (this.artistId) {
      this.artistService.editArtist(this.artist!);
      console.log('After Edit - Artist:', this.artist);
    } else {
      this.artistService.addArtist(this.artist!);
      console.log('After Save - Artist:', this.artist);
    }
    // this.router.navigate(['..'], { relativeTo: this.route });
    this.router.navigate(['/artist']);
  }
}
