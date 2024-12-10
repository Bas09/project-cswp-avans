import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Correct import
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AboutComponent } from './about/about.component';

// Users imports
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

// Auth imports
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Playlist imports
import { PlaylistListComponent } from './playlist/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { PlaylistEditComponent } from './playlist/playlist-edit/playlist-edit.component';

import { SongEditComponent } from './song/song-edit/song-edit.component';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule, // Add RouterModule here
    FormsModule
  ],
  declarations: [
    AboutComponent,
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    PlaylistEditComponent,
    SongEditComponent,
    SongListComponent,
    SongDetailComponent,
  ],
  providers: [DatePipe],
  exports: [

    AboutComponent,
    UserEditComponent,
    UserListComponent,
    DashboardComponent,
    UserDetailComponent,
    LoginComponent,
    RegisterComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    PlaylistEditComponent,
  ],
})
export class FeaturesModule { }
