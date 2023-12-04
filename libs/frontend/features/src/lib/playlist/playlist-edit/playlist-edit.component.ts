import {
  IPlaylist,
  IUser,
  Genre,
  PublicStatus,
} from '@avans-project-cswp/shared/api';
import { EditComponent } from '../../abstractions/components/edit.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'avans-project-cswp-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
})
export class PlaylistEditComponent
  extends EditComponent<IPlaylist>
  implements OnInit
{
  selectedGenres: Genre = Genre.Default; // Add selectedGenres property
  selectedPublicStatus: PublicStatus = PublicStatus.Default; // Add selectedPublicStatus

  constructor(
    playlistService: PlaylistService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(playlistService, route, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.selectedGenres = this.entity.genre || Genre.Default;
    this.selectedPublicStatus =
      this.entity.publicStatus || PublicStatus.Default;
  }

  override onSubmit(entity: IPlaylist): void {
    this.entity.genre = this.selectedGenres;
    this.entity.publicStatus = this.selectedPublicStatus;

    super.onSubmit(entity); // Call the parent save method
  }
}
