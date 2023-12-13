import { Routes } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';

export const artistRoutes: Routes = [
  { path: 'artist', pathMatch: 'full', component: ArtistListComponent },
  { path: 'artist/:id', pathMatch: 'full', component: ArtistDetailComponent },
  {
    path: 'artist/new/edit',
    pathMatch: 'full',
    component: ArtistEditComponent,
  },
  {
    path: 'artist/:id/edit',
    pathMatch: 'full',
    component: ArtistEditComponent,
  },
];
