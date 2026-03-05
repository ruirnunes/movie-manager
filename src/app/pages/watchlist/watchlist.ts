import { Component, OnInit } from '@angular/core';
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

  toWatchMovies: Movie[] = []

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatchlist()
  }

  loadWatchlist(): void {
    this.toWatchMovies = this.movieService.getMovies().filter(m => m.status === 'to-watch')
  }

  // updateStatus(id: string, newStatus: 'to-watch' | 'watching' | 'watched' | 'skipped') {
  //   this.movieService.patchMovie(id, { status: newStatus });
  //   this.loadWatchlist();
  // }

  // removeMovie(id: string) {
  //   this.movieService.deleteMovie(id);
  //   this.loadWatchlist();
  // }
}
