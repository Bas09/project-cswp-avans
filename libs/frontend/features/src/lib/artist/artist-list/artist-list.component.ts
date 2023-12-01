import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'avans-project-cswp-artist-list',
  templateUrl: './artist-list.component.html',

  styles: [],
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artists = this.artistService.getArtists();
    console.log('Artists:', this.artists);
  }
}
