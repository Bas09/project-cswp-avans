import { Route } from '@angular/router';

import { AboutComponent } from 'libs/frontend/features/src/lib/about/about.component';
import { MealListComponent } from 'libs/frontend/features/src/lib/meal/meal-list/meal-list.component';

import { DashboardComponent } from 'libs/frontend/features/src/lib/dashboard/dashboard.component';

import { LoginComponent } from 'libs/frontend/features/src/lib/auth/login/login.component';
import { RegisterComponent } from 'libs/frontend/features/src/lib/auth/register/register.component';

import { PlaylistComponent } from 'libs/frontend/features/src/lib/playlist/playlist-list/playlist-list.component';

// import childroutes
import { userRoutes } from 'libs/frontend/features/src/lib/user/user.routes';
import { playlistRoutes } from 'libs/frontend/features/src/lib/playlist/playlist.routes';
import { artistRoutes } from 'libs/frontend/features/src/lib/artist/artist.routes';

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

  // meal page
  {
    path: 'meals',
    component: MealListComponent,
  },

  // user pages
  ...userRoutes,

  // playlist pages
  ...playlistRoutes,

  ...artistRoutes,

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
