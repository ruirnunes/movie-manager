import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink, DateFormatPipe],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);

  // movie object to display in the details page
  movie: Movie | undefined = undefined;

  ngOnInit(): void {
    // retrieve movie id from route parameters
    const id: string | null = this.route.snapshot.paramMap.get('id');

    // if id exists, fetch the movie from the service
    if (id) {
      this.movie = this.movieService.getMoviesByID(id);
    }
  }

  // toggle favorite status
  toggleFavorite(): void {
    if (!this.movie) return;

    this.movieService.toggleFavorite(this.movie.id);
    this.movie.isFavorite = !this.movie.isFavorite;
  }

  // delete movie and navigate back to list
  deleteMovie(): void {
    if (!this.movie) return;

    this.movieService.deleteMovie(this.movie.id);
    this.router.navigate(['/movies']);
  }
}
