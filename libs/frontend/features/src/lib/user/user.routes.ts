// user.routes.ts

import { Routes } from '@angular/router';
import { UserListComponent } from 'libs/frontend/features/src/lib/user/user-list/user-list.component';
import { UserDetailComponent } from 'libs/frontend/features/src/lib/user/user-detail/user-detail.component';
import { UserEditComponent } from 'libs/frontend/features/src/lib/user/user-edit/user-edit.component';

export const userRoutes: Routes = [
  { path: 'users', pathMatch: 'full', component: UserListComponent },
  { path: 'users/:id', pathMatch: 'full', component: UserDetailComponent },
  { path: 'users/new/edit', pathMatch: 'full', component: UserEditComponent },
  { path: 'users/:id/edit', pathMatch: 'full', component: UserEditComponent },
];
