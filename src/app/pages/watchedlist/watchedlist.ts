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

  // updateStatus(id: string, newStatus: 'to-watch' | 'watching' | 'watched' | 'skipped'): void {
  //   this.movieService.patchMovie(id, { status: newStatus });
  //   this.loadWatched();
  // }

  // removeMovie(id: string): void {
  //   this.movieService.deleteMovie(id);
  //   this.loadWatched();
  // }
}
