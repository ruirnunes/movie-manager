import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { seedMovies } from '../data/seed-movies';

@Injectable({
  providedIn: 'root',
})

export class MovieService {

  // key for localStorage
  private storageKey: string = "movies";

  // get all movies
  getMovies(): Movie[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]') as Movie[];
  }

  // get a movie by ID
  getMoviesByID(id: string): Movie | undefined {
    const movies: Movie[] = this.getMovies();
    return movies.find((m: Movie) => id === m.id);
  }

  // save movie array to localStorage
  saveMovies(movies: Movie[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
  }

  // add a new movie
  addMovie(movie: Movie): void {
    const movies: Movie[] = this.getMovies();
    movies.push(movie);
    this.saveMovies(movies);
  }

  // delete a movie by ID
  deleteMovie(id: string): void {
    const movies: Movie[] = this.getMovies();
    const updatedMovies: Movie[] = movies.filter((m: Movie) => id !== m.id);
    this.saveMovies(updatedMovies);
  }

  // update entire movie object
  updateMovie(updatedMovie: Movie): void {
    const movies: Movie[] = this.getMovies();
    const index: number = movies.findIndex((m: Movie) => m.id === updatedMovie.id);

    if (index !== -1) {
      movies[index] = updatedMovie;
      this.saveMovies(movies);
    }
  }

  // partially update movie fields
  patchMovie(id: string, changes: Partial<Movie>): void {
    const movies: Movie[] = this.getMovies();
    const index: number = movies.findIndex((m: Movie) => m.id === id);

    if (index !== -1){
      movies[index] = {
        ...movies[index],
        ...changes
      };
    }

    this.saveMovies(movies);
  }

  // toggle movie favorite status
  toggleFavorite(id: string): void {
    const movie: Movie | undefined = this.getMoviesByID(id);

    if (movie) {
      this.patchMovie(id, { isFavorite: !movie.isFavorite });
    }
  }

 // populates localStorage with seed data if empty
  seedData(): void {
    if (!localStorage.getItem(this.storageKey)) {
      this.saveMovies(seedMovies);
    }
  }
}
