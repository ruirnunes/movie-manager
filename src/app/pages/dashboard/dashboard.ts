import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { KpiCard } from '../../components/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCard],
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
  }
}
