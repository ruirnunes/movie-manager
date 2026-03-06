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

  watchedMovies: Movie[] = []

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatched()
  }

  loadWatched(): void {
    this.watchedMovies = this.movieService.getMovies().filter(m => m.status === 'watched')
  }

  onStatusChange(event: { id: string; status: Movie['status'] }) {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadWatched();
  }

  onFavoriteToggle(id: string) {
    this.movieService.toggleFavorite(id);
    this.loadWatched();
  }

  onDelete(id: string) {
    this.movieService.deleteMovie(id);
    this.loadWatched();
  }
}
