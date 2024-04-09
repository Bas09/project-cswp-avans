import { Routes } from '@angular/router';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { PartyEditComponent } from './party-edit/party-edit.component';

export const partyRoutes: Routes = [
  { path: 'party', pathMatch: 'full', component: PartyListComponent },
  { path: 'party/:id', pathMatch: 'full', component: PartyDetailComponent },
  {
    path: 'party/new/edit',
    pathMatch: 'full',
    component: PartyEditComponent,
  },
  {
    path: 'party/:id/edit',
    pathMatch: 'full',
    component: PartyEditComponent,
  },
];
