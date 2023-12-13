import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { IPlaylist } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: [],
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: IPlaylist | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false; // Add isEdit property

  playlistId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.playlistId = params.get('id');

      // Subscribe to the observable returned by playlistService.read
      this.playlistService.read(this.playlistId).subscribe(
        (result) => {
          this.playlist = result;
          // Assuming you have an authentication mechanism, check if the current user can edit this playlist
          // For demonstration, let's assume that any authenticated user can edit any playlist
          this.canEdit = true;
        },
        (error) => {
          console.error('Error fetching playlist:', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    console.log('onDelete button clicked');
    if (this.playlist) {
      console.log('this.playlist exists: ', this.playlist);
      this.playlistService.deletePlaylist(this.playlist._id).subscribe(() => {
        console.log('playlist deleted', this.playlist?._id);

        // Fetch the updated playlist list after deletion
        this.playlistService.list().subscribe((playlists) => {
          // Update the playlist list in the PlaylistListComponent
          // (You may emit an event or update the playlist list as per your component architecture)
          console.log('Updated playlist list:', playlists);
        });
      });
    }

    this.router.navigate(['/playlist']);
  }
}

// import { IPlaylist } from '@avans-project-cswp/shared/api';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { PlaylistService } from '../playlist.service';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { DetailComponent } from '../../abstractions/components/detail.component';

// @Component({
//   selector: 'avans-project-cswp-playlist-detail',
//   templateUrl: './playlist-detail.component.html',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
//   providers: [PlaylistService],
// })
// export class PlaylistDetailComponent
//   extends DetailComponent<IPlaylist>
//   implements OnInit
// {
//   constructor(
//     playlistService: PlaylistService,
//     route: ActivatedRoute,
//     router: Router
//   ) {
//     super(playlistService, route, router);
//   }
// }
