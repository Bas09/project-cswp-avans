import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';

import { AboutComponent } from './about/about.component';

// usersimports
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { PlaylistComponent } from './playlist/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { PlaylistEditComponent } from './playlist/playlist-edit/playlist-edit.component';
// playlist imports

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PlaylistComponent,
    PlaylistDetailComponent,
    PlaylistEditComponent,
  ],
  providers: [MealService, DatePipe],
  exports: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    UserEditComponent,
    UserListComponent,
    DashboardComponent,
    UserDetailComponent,
    LoginComponent,
    RegisterComponent,
    PlaylistComponent,
    PlaylistDetailComponent,
    PlaylistEditComponent,
  ],
})
export class FeaturesModule {}
