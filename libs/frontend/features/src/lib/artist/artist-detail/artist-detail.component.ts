import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { IArtist } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-artist-detail',
  templateUrl: './artist-detail.component.html',
  styles: [],
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist: IArtist | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false;

  artistId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id');

      this.artistService.read(this.artistId).subscribe(
        (result) => {
          this.artist = result;
          this.canEdit = true;
        },
        (error) => {
          console.error('Error fetching artist:', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    console.log('onDelete button clicked');
    if (this.artist) {
      console.log('this.artist exists: ', this.artist);
      this.artistService.removeArtist(this.artist._id).subscribe(() => {
        console.log('artist deleted', this.artist?._id);

        this.artistService.list().subscribe((artists) => {
          console.log('Updated artist list:', artists);
        });
      });
    }

    this.router.navigate(['/artists']);
  }
}
