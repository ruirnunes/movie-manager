import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-watchedlist',
  imports: [MovieCard],
  templateUrl: './watchedlist.html',
  styleUrl: './watchedlist.css',
})

export class WatchedlistComponent implements OnInit {

  // movies with 'watched' status
  watchedMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatched();
  }

  // load watched movies from service
  loadWatched(): void {
    this.watchedMovies = this.movieService.getMovies().filter((m: Movie) => m.status === 'watched');
  }

  // update movie status
  onStatusChange(event: { id: string; status: Movie['status'] }): void {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadWatched();
  }

  // toggle favorite status
  onFavoriteToggle(id: string): void {
    this.movieService.toggleFavorite(id);
    this.loadWatched();
  }

  // delete movie
  onDelete(id: string): void {
    this.movieService.deleteMovie(id);
    this.loadWatched();
  }
}