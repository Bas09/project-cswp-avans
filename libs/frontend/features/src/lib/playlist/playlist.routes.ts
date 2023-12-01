import { Routes } from '@angular/router';
import { PlaylistComponent } from './playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';

//impprot playlistEdit nog toevoegen

export const playlistRoutes: Routes = [
  {
    path: 'playlist',
    pathMatch: 'full',
    component: PlaylistComponent,
  },
  {
    path: 'playlist/:id',
    pathMatch: 'full',
    component: PlaylistDetailComponent,
  },
  {
    path: 'playlist/:id/edit',
    pathMatch: 'full',
    component: PlaylistEditComponent,
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
  // {
  //   path: 'playlist/user/:id',
  //   pathMatch: 'full',
  //   component: PlaylistEditComponent,
  // },
];
