import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard,CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  standalone: true
})
export class MovieListComponent implements OnInit {
  
  movies: Movie[] = []

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies()
  }

  removeMovie(id: string){
    this.movieService.deleteMovie(id)
    this.movies = this.movieService.getMovies()
  }
}
