import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-favorites',
  imports: [MovieCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})

export class FavoritesComponent implements OnInit {

  // array that stores the favorite movies
  favoriteMovies: Movie[] = []

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // load favorite movies when component initializes
    this.loadFavorites()
  }

  // retrieves only the movies marked as favorite
  loadFavorites(): void {
    this.favoriteMovies = this.movieService.getMovies().filter(m => m.isFavorite)
  }

  // toggles favorite status and refreshes the list
  onFavoriteToggle(id: string) {
    this.movieService.toggleFavorite(id); 
    this.loadFavorites(); 
  }

  // deletes a movie and refreshes the favorites list
  onDelete(id: string) {
    this.movieService.deleteMovie(id);
    this.loadFavorites();
  }
}