import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { IArtist } from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: [],
})
export class ArtistListComponent implements OnInit, OnDestroy {
  artists: IArtist[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.subscription = this.artistService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.artists = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
