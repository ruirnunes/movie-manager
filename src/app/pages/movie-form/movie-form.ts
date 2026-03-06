import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrls: ['./movie-form.css'],
})
export class MovieFormComponent implements OnInit {

  movie!: Movie;
  isEditMode = false;

  movieForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const existingMovie = this.movieService.getMoviesByID(id);
      if (existingMovie) {
        this.movie = { ...existingMovie };
        this.isEditMode = true;
      }
    }

    this.initForm();
  }

  initForm() {
    this.movieForm = new FormGroup({
      title: new FormControl(this.movie?.title || '', [Validators.required]),
      genre: new FormControl(this.movie?.genre || '', [Validators.required]),
      releaseDate: new FormControl(this.movie?.releaseDate || '', [
        Validators.required,
        this.futureDateValidator
      ]),
      rating: new FormControl(this.movie?.rating || 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(10)
      ]),
      status: new FormControl(this.movie?.status || 'skipped'),
      description: new FormControl(this.movie?.description || '', [Validators.required])
    });
  }

  // Validação customizada: a data não pode ser futura
  futureDateValidator(control: AbstractControl) {
    const selected = new Date(control.value);
    return selected > new Date() ? { futureDate: true } : null;
  }

  saveMovie() {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    const formValue = this.movieForm.value;
    if (this.isEditMode && this.movie) {
      this.movieService.updateMovie({ ...this.movie, ...formValue });
    } else {
      const newMovie: Movie = { ...formValue, id: crypto.randomUUID(), idFavorited: false };
      this.movieService.addMovie(newMovie);
    }

    this.router.navigate(['/movies']);
  }
}