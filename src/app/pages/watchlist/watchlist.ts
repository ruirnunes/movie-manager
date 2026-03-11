import { Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-watchlist',
  imports: [MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class WatchlistComponent implements OnInit {
  private movieService = inject(MovieService);

  // movies with 'to-watch' status
  toWatchMovies: Movie[] = [];

  ngOnInit(): void {
    this.loadWatchlist();
  }

  // load 'to-watch' movies from service
  loadWatchlist(): void {
    this.toWatchMovies = this.movieService
      .getMovies()
      .filter((m: Movie) => m.status === 'to-watch');
  }

  // update movie status
  onStatusChange(event: { id: string; status: Movie['status'] }): void {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadWatchlist();
  }

  // toggle favorite status
  onFavoriteToggle(id: string): void {
    this.movieService.toggleFavorite(id);
    this.loadWatchlist();
  }

  // delete movie
  onDelete(id: string): void {
    this.movieService.deleteMovie(id);
    this.loadWatchlist();
  }
}
