import { IPlaylist } from '@avans-project-cswp/shared/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../../abstractions/components/detail.component';

@Component({
  selector: 'avans-project-cswp-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  providers: [PlaylistService],
})
export class PlaylistDetailComponent
  extends DetailComponent<IPlaylist>
  implements OnInit
{
  constructor(
    playlistService: PlaylistService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(playlistService, route, router);
  }
}
