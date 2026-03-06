import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard,CommonModule,FormsModule ],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  standalone: true
})
export class MovieListComponent implements OnInit {
  
  movies: Movie[] = []
  filteredMovies: Movie[] = []

  selectedGenre: string = 'All'
  genres: string[] = []

  ratingDesc: boolean = true;

  searchTerm: string = ''

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movies = this.movieService.getMovies();

    const uniqueGenres: string[] = Array.from(new Set(this.movies.map(m => m.genre)))
    uniqueGenres.sort((a, b) => a.localeCompare(b))

    this.genres = ['All', ... uniqueGenres]

    this.applyFilter()
  }

  applyFilter(): void {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesGenre = this.selectedGenre === 'All' || movie.genre === this.selectedGenre;
      const matchesTitle = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesGenre && matchesTitle;
    });
  }

  onGenreChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    this.selectedGenre = select.value
    this.applyFilter()
  }

  onStatusChange(event: { id: string; status: Movie['status'] }) {
    this.movieService.patchMovie(event.id, { status: event.status });
    this.loadMovies(); // atualiza a lista
  }

  onFavoriteToggle(id: string) {
    this.movieService.toggleFavorite(id);
    this.loadMovies();
  }

  toggleSortByRating(): void {
    this.ratingDesc = !this.ratingDesc;
    this.filteredMovies.sort((a, b) => this.ratingDesc ? b.rating - a.rating : a.rating - b.rating);
  }

  onDelete(id: string) {
    this.movieService.deleteMovie(id);
    this.loadMovies();
  }
}

