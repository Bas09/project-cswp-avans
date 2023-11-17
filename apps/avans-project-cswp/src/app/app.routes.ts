import { Route } from '@angular/router';

import { AboutComponent } from 'libs/frontend/features/src/lib/about/about.component';
import { MealListComponent } from 'libs/frontend/features/src/lib/meal/meal-list/meal-list.component';

import { EditComponent } from 'libs/frontend/features/src/lib/user/user-edit/edit.component';
// import { UserDetailComponent } from 'libs/frontend/features/src/lib/user/user-detail/detail.component';
import { UserListComponent } from 'libs/frontend/features/src/lib/user/user-list/user-list.component';
import { DetailComponent } from 'libs/frontend/features/src/lib/user/user-detail/detail.component';

import { DashboardComponent } from 'libs/frontend/features/src/lib/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  // home page or dashboard
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },

  {
    path: 'dashboard',
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

  // user page

  { path: 'users', pathMatch: 'full', component: UserListComponent },

  { path: 'users/:id', pathMatch: 'full', component: DetailComponent },

  // users/new moet voor users/:id, omdat new anders als de id wordt gezien.
  // Volgorde is belangrijk in routing.
  { path: 'users/new/edit', pathMatch: 'full', component: EditComponent },

  { path: 'users/:id/edit', pathMatch: 'full', component: EditComponent },
];
