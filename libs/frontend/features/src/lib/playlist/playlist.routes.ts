import { Routes } from '@angular/router';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';

//impprot playlistEdit nog toevoegen

export const playlistRoutes: Routes = [
  {
    path: 'playlist',
    pathMatch: 'full',
    component: PlaylistListComponent,
  },
  {
    path: 'playlist/:id',
    pathMatch: 'full',
    component: PlaylistDetailComponent,
  },
  {
    path: 'playlist/new/edit',
    pathMatch: 'full',
    component: PlaylistEditComponent,
  },
  {
    path: 'playlist/:id/edit',
    pathMatch: 'full',
    component: PlaylistEditComponent,
  },
];
