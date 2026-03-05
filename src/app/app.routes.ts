import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { MovieListComponent } from './pages/movie-list/movie-list';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';
import { MovieFormComponent } from './pages/movie-form/movie-form';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/edit/:id', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent }
];