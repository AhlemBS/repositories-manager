import { Routes } from '@angular/router';
import { CommitsPageComponent } from './commits-page/commits-page.component';

export const COMMITS_ROUTES: Routes = [
  {
    path: ':ownerName/:repoName',
    component: CommitsPageComponent,
  },
];
