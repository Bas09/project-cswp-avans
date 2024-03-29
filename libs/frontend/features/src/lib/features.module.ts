import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutComponent } from './about/about.component';

// usersimports
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

// accout / login
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserService } from './user/user.service';

// playlist imports
import { PlaylistListComponent } from './playlist/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { PlaylistEditComponent } from './playlist/playlist-edit/playlist-edit.component';
import { PlaylistService } from './playlist/playlist.service';

import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { SongEditComponent } from './song/song-edit/song-edit.component';
import { SongService } from './song/song.service';

// artist imports
import { ArtistListComponent } from './artist/artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { ArtistEditComponent } from './artist/artist-edit/artist-edit.component';
import { ArtistService } from './artist/artist.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
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
    SongListComponent,
    SongDetailComponent,
    SongEditComponent,
    ArtistListComponent,
    ArtistDetailComponent,
    ArtistEditComponent,
  ],
  providers: [
    DatePipe,
    UserService,
    PlaylistService,
    SongService,
    ArtistService,
  ],
  exports: [
    AboutComponent,
    UserEditComponent,
    UserListComponent,
    UserDetailComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    PlaylistEditComponent,
    SongListComponent,
    SongDetailComponent,
    SongEditComponent,
    ArtistListComponent,
    ArtistDetailComponent,
    ArtistEditComponent,
  ],
})
export class FeaturesModule {}
