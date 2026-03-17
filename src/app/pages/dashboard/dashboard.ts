import { Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCard, MovieCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private movieService = inject(MovieService);

  // movie data
  movies: Movie[] = [];

  // KPI values
  totalMovies = 0;
  watchedMovies = 0;
  toWatchMovies = 0;
  skippedMovies = 0;
  watchingMovies = 0;
  averageRating = 0;

  // top favorite movies
  topFavorites: Movie[] = [];

  // initialize dashboard data
  ngOnInit(): void {
    this.movieService.seedData();
    this.loadKpis();
  }

  // calculate KPI values
  loadKpis(): void {
    this.movies = this.movieService.getMovies();

    this.totalMovies = this.movies.length;

    this.watchedMovies = this.movies.filter((m: Movie) => m.status === 'watched').length;

    this.toWatchMovies = this.movies.filter((m: Movie) => m.status === 'to-watch').length;

    this.skippedMovies = this.movies.filter((m: Movie) => m.status === 'skipped').length;

    this.watchingMovies = this.movies.filter((m: Movie) => m.status === 'watching').length;

    this.averageRating = this.movies.length
      ? Number(
          (
            this.movies.reduce((sum: number, m: Movie) => sum + m.rating, 0) / this.movies.length
          ).toFixed(2),
        )
      : 0;

    this.topFavorites = this.movies
      .filter((m: Movie) => m.isFavorite)
      .sort((a: Movie, b: Movie) => b.rating - a.rating)
      .slice(0, 3);
  }

  // handle movie status change
  onStatusChange(event: { id: string; status: Movie['status'] }): void {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadKpis();
  }

  // toggle favorite status
  onFavoriteToggle(id: string): void {
    this.movieService.toggleFavorite(id);
    this.loadKpis();
  }

  // delete movie
  onDelete(id: string): void {
    this.movieService.deleteMovie(id);
    this.loadKpis();
  }
}
