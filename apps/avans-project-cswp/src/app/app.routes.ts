import { Route } from '@angular/router';

import { AboutComponent } from 'libs/frontend/features/src/lib/about/about.component';

import { DashboardComponent } from 'libs/frontend/features/src/lib/dashboard/dashboard.component';

import { LoginComponent } from 'libs/frontend/features/src/lib/auth/login/login.component';
import { RegisterComponent } from 'libs/frontend/features/src/lib/auth/register/register.component';

import { PlaylistListComponent } from 'libs/frontend/features/src/lib/playlist/playlist-list/playlist-list.component';

// import childroutes
import { userRoutes } from 'libs/frontend/features/src/lib/user/user.routes';
import { playlistRoutes } from 'libs/frontend/features/src/lib/playlist/playlist.routes';
import { songRoutes } from 'libs/frontend/features/src/lib/song/song.routes';

export const appRoutes: Route[] = [
  // home page or dashboard
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },

  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },

  // about page
  {
    path: 'about',
    component: AboutComponent,
  },



  // user pages
  ...userRoutes,

  // playlist pages
  ...playlistRoutes,

  ...songRoutes,

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },


  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
