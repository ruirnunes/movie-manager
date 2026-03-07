import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrls: ['./movie-form.css'],
})
export class MovieFormComponent implements OnInit {

  // movie being edited (if any)
  movie: Movie | undefined = undefined;

  // edit mode flag
  isEditMode: boolean = false;

  // reactive form group
  movieForm: FormGroup = new FormGroup({});;

  constructor(
    private route: ActivatedRoute,  // access route parameters
    private router: Router,          // navigate programmatically
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // check if an ID is provided in the route
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id) {
      const existingMovie: Movie | undefined = this.movieService.getMoviesByID(id);
      if (existingMovie) {
        // copy movie to avoid mutating original
        this.movie = { ...existingMovie };
        this.isEditMode = true;
      }
    }

    // initialize reactive form
    this.initForm();
  }

  // initialize reactive form controls and validators
  initForm(): void {
    this.movieForm = new FormGroup({
      title: new FormControl(this.movie?.title || '', [Validators.required]),
      genre: new FormControl(this.movie?.genre || '', [Validators.required]),
      director: new FormControl(this.movie?.director || '', [Validators.required]),
      duration: new FormControl(this.movie?.duration || 0, [
        Validators.required,
        Validators.min(1) // minimum 1 min
      ]),
      cast: new FormControl(this.movie?.cast?.join(', ') || '', [this.castValidator]),
      language: new FormControl(this.movie?.language || '', [Validators.required]),
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
      description: new FormControl(this.movie?.description || '', [Validators.required]),
      notes: new FormControl(this.movie?.notes || '')
    });
  }

  // validate future dates
  futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selected: Date = new Date(control.value);
    return selected > new Date() ? { futureDate: true } : null;
  }

  // validate cast string
  castValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value as string;
    if (!value || value.trim() === '') return { required: true };
    if (!value.includes(',')) return { invalidFormat: true };

    const actors: string[] = value.split(',').map(a => a.trim());
    if (actors.some(a => a === '')) return { invalidFormat: true };

    return null; // valid
  }

  // save or update movie
  saveMovie(): void {
    if (!this.movieForm || this.movieForm.invalid) {
      this.movieForm?.markAllAsTouched();
      return;
    }

    const formValue: any = this.movieForm.value;

    const castArray: string[] = formValue.cast.split(',').map((c: string) => c.trim());

    const movieData: Movie = { ...formValue, cast: castArray };

    if (this.isEditMode && this.movie) {
      // update existing
      this.movieService.updateMovie({ ...this.movie, ...movieData });
    } else {
      // add new movie
      const newMovie: Movie = { ...movieData, id: crypto.randomUUID(), isFavorite: false };
      this.movieService.addMovie(newMovie);
    }

    this.router.navigate(['/movies']);
  }
}