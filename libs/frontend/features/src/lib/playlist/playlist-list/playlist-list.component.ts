import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { IPlaylist } from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: [],
})
export class PlaylistListComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.subscription = this.playlistService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.playlists = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { PlaylistService } from '../playlist.service';
// import { UserService } from '../../user/user.service';
// import { IPlaylist } from '@avans-project-cswp/shared/api';
// import { ListComponent } from '../../abstractions/components/list.component';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'avans-project-cswp-playlist-list',
//   templateUrl: './playlist-list.component.html',
//   styles: [],
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, RouterModule],
//   providers: [UserService],
// })
// export class PlaylistListComponent extends ListComponent<IPlaylist> {
//   constructor(playlistService: PlaylistService) {
//     super(playlistService);
//   }
// }
