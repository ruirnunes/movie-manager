import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCard,MovieCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  
  movies: Movie[] = []

  totalMovies: number = 0 
  watchedMovies: number = 0
  toWatchMovies: number = 0
  skippedMovies: number = 0
  watchingMovies: number = 0
  averageRating: number = 0

  topFavorites: Movie[] = [];


  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadKpis()
    this.movieService.seedData()
  }

  loadKpis(){

    this.movies = this.movieService.getMovies()

    this.totalMovies = this.movies.length

    this.watchedMovies = this.movies.filter(m => m.status === 'watched').length

    this.toWatchMovies = this.movies.filter(m => m.status === 'to-watch').length

    this.skippedMovies = this.movies.filter(m => m.status === 'skipped').length

    this.watchingMovies = this.movies.filter(m => m.status === 'watching').length

    this.averageRating = this.movies.length 
    ? this.movies.reduce((sum,m) => sum + m.rating, 0) / this.movies.length 
    : 0

    this.topFavorites = this.movies
      .filter(m => m.isFavorite)          // apenas filmes favoritos
      .sort((a, b) => b.rating - a.rating) // ordena do maior para o menor rating
      .slice(0, 3);                        // pega os 3 primeiros
  }

  onStatusChange(event: {id: string, status: Movie['status']}) {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadKpis();
  }

  onFavoriteToggle(id: string) {
    this.movieService.toggleFavorite(id);
    this.loadKpis();
  }

  onDelete(id: string) {
    this.movieService.deleteMovie(id);
    this.loadKpis();
  }
}
