import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'avans-project-cswp-artist-detail',
  templateUrl: './artist-detail.component.html',
})
export class ArtistDetailComponent implements OnInit {
  artistId: string | null = null;
  artist: Artist | null = null;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id');
      this.artist = this.artistService.getArtistById(Number(this.artistId));
    });
  }

  delete(): void {
    console.log('Before delete - Artist', this.artist);
    this.artistService.deleteArtist(this.artist!);
    this.router.navigate(['/artist']);
  }
}
