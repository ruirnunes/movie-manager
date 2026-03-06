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

  favoriteMovies: Movie[] = []

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadFavorites()
  }

  loadFavorites(): void {
    this.favoriteMovies = this.movieService.getMovies().filter(m => m.isFavorite)
  }

    onFavoriteToggle(id: string) {
    this.movieService.toggleFavorite(id); // altera o isFavorite
    this.loadFavorites(); // atualiza a lista de favoritos
  }

  onDelete(id: string) {
    this.movieService.deleteMovie(id);
    this.loadFavorites();
  }
}
