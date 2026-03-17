import { Component, OnInit, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, CommonModule, FormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  standalone: true,
})
export class MovieListComponent implements OnInit {
  private movieService = inject(MovieService);

  // all movies from service
  movies: Movie[] = [];

  // movies after filtering/search
  filteredMovies: Movie[] = [];

  // selected genre filter
  selectedGenre = 'All';

  // available genres
  genres: string[] = [];

  // sort order flag for rating
  ratingDesc = true;

  // search term for title filter
  searchTerm = '';

  ngOnInit(): void {
    this.loadMovies();
  }

  // load all movies and set genres
  loadMovies(): void {
    this.movies = this.movieService.getMovies();

    const uniqueGenres: string[] = Array.from(new Set(this.movies.map((m: Movie) => m.genre)));
    uniqueGenres.sort((a: string, b: string) => a.localeCompare(b));

    this.genres = ['All', ...uniqueGenres];

    this.applyFilter();
  }

  // apply genre and title filters
  applyFilter(): void {
    this.filteredMovies = this.movies.filter((movie: Movie) => {
      const matchesGenre: boolean =
        this.selectedGenre === 'All' || movie.genre === this.selectedGenre;
      const matchesTitle: boolean = movie.title
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return matchesGenre && matchesTitle;
    });
  }

  // handle genre select change
  onGenreChange(event: Event): void {
    const select: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedGenre = select.value;
    this.applyFilter();
  }

  // handle movie status change
  onStatusChange(event: { id: string; status: Movie['status'] }): void {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadMovies();
  }

  // toggle favorite status
  onFavoriteToggle(id: string): void {
    this.movieService.toggleFavorite(id);
    this.loadMovies();
  }

  // toggle sorting by rating
  toggleSortByRating(): void {
    this.ratingDesc = !this.ratingDesc;
    this.filteredMovies.sort((a: Movie, b: Movie) =>
      this.ratingDesc ? b.rating - a.rating : a.rating - b.rating,
    );
  }

  // delete movie
  onDelete(id: string): void {
    this.movieService.deleteMovie(id);
    this.loadMovies();
  }
}
