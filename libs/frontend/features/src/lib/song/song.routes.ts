import { Routes } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongEditComponent } from './song-edit/song-edit.component';

export const songRoutes: Routes = [
  { path: 'songs', pathMatch: 'full', component: SongListComponent },
  { path: 'songs/:id', pathMatch: 'full', component: SongDetailComponent },
  { path: 'songs/new/edit', pathMatch: 'full', component: SongEditComponent },
  { path: 'songs/:id/edit', pathMatch: 'full', component: SongEditComponent },
];
