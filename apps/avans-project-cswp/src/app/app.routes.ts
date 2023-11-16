import { Route } from '@angular/router';

import { AboutComponent } from 'libs/frontend/features/src/lib/about/about.component';
import { MealListComponent } from 'libs/frontend/features/src/lib/meal/meal-list/meal-list.component';

import { EditComponent } from 'libs/frontend/features/src/user/edit/edit.component'
import { DetailComponent } from 'libs/frontend/features/src/user/detail/detail.component'
import { ListComponent } from 'libs/frontend/features/src/user/list/list.component'


export const appRoutes: Route[] = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'dashboard'
    // },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'meals',
        component: MealListComponent,
    },
 

    { path: "users", pathMatch: "full", component: ListComponent },
    // users/new moet voor users/:id, omdat new anders als de id wordt gezien.
    // Volgorde is belangrijk in routing.
    { path: "users/new", pathMatch: "full", component: EditComponent },
    { path: "users/:id", pathMatch: "full", component: DetailComponent },
    { path: "users/:id/edit", pathMatch: "full", component: EditComponent },
];
