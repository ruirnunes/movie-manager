import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { MovieListComponent } from './pages/movie-list/movie-list';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';
import { MovieFormComponent } from './pages/movie-form/movie-form';
import { WatchlistComponent } from './pages/watchlist/watchlist';
import { WatchedlistComponent } from './pages/watchedlist/watchedlist';
import { FavoritesComponent } from './pages/favorites/favorites';

// app routes configuration
export const routes: Routes = [
  { path: '', component: DashboardComponent },        // home dashboard
  { path: 'movies', component: MovieListComponent },  // list all movies
  { path: 'movies/new', component: MovieFormComponent }, // add new movie
  { path: 'movies/edit/:id', component: MovieFormComponent }, // edit movie
  { path: 'movies/:id', component: MovieDetailComponent },    // movie details
  { path: 'watchlist', component: WatchlistComponent },       // watchlist page
  { path: 'watchedlist', component: WatchedlistComponent },   // watched movies page
  { path: 'favorites', component: FavoritesComponent }       // favorites page
];