import { Component, OnDestroy, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { ISong } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-song-detail',
  templateUrl: './song-detail.component.html',
  styles: [],
})
export class SongDetailComponent implements OnInit, OnDestroy {
  song: ISong | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false;

  songId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.songId = params.get('id');

      this.songService.read(this.songId).subscribe(
        (result) => {
          this.song = result;
          this.canEdit = true;
        },
        (error) => {
          console.error('Error fetching song:', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    console.log('onDelete button clicked');
    if (this.song) {
      console.log('this.song exists: ', this.song);
      this.songService.removeSong(this.song._id).subscribe(() => {
        console.log('song deleted', this.song?._id);

        // Fetch the updated song list after deletion
        this.songService.list().subscribe((songs) => {
          // Update the song list in the SongListComponent
          // (You may emit an event or update the song list as per your component architecture)
          console.log('Updated song list:', songs);
        });
      });
    }

    this.router.navigate(['/songs']);
  }
}
