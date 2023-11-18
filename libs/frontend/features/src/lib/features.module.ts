import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';
import { HttpClientModule } from '@angular/common/http';

import { AboutComponent } from './about/about.component';
import { DetailComponent } from './user/user-detail/detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { EditComponent } from './user/user-edit/edit.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    DetailComponent,
    EditComponent,
    UserListComponent,
    DashboardComponent,
  ],
  providers: [MealService],
  exports: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    EditComponent,
    UserListComponent,
    DashboardComponent,
    DetailComponent,
  ],
})
export class FeaturesModule {}
