import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink,DateFormatPipe],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})

export class MovieDetailComponent implements OnInit {
  movie!: Movie | undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.movie = this.movieService.getMoviesByID(id)
    }
  }

  toggleFavorite() {
    if (!this.movie) return;
    
    this.movieService.toggleFavorite(this.movie.id);
    this.movie.isFavorite = !this.movie.isFavorite;
  }

  deleteMovie(){
    if (!this.movie) return

    this.movieService.deleteMovie(this.movie.id)
    this.router.navigate(['/movies'])
  }
}
