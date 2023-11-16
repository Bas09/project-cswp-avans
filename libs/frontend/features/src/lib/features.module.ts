import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';
import { HttpClientModule } from '@angular/common/http';

import { AboutComponent } from './about/about.component';
import { DetailComponent } from './user/user-detail/detail.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    DetailComponent,

    UserListComponent,
    DashboardComponent,
  ],
  providers: [MealService],
  exports: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,

    UserListComponent,
    DashboardComponent,
    DetailComponent,
  ],
})
export class FeaturesModule {}
