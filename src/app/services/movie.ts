import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})

export class MovieService {

  private storageKey: string = "movies"

  getMovies(): Movie[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]' )
  }

  getMoviesByID(id: string): Movie | undefined {
    const movies: Movie[] = this.getMovies()
    return movies.find(m => id === m.id)
  }

  saveMovies(movies: Movie[]): void {
    return localStorage.setItem(this.storageKey, JSON.stringify(movies))
  }

  addMovie(movie: Movie): void {
    const movies: Movie[] = this.getMovies()
    movies.push(movie)
    this.saveMovies(movies)
  }

  deleteMovie(id: string): void {
    const movies: Movie[] = this.getMovies()
    const updatedMovies: Movie[] = movies.filter(m => id !== m.id)
    this.saveMovies(updatedMovies)
  }

  updateMovie(updatedMovie: Movie): void {
    
    const movies: Movie[] = this.getMovies()
    const index: number = movies.findIndex(m => m.id === updatedMovie.id)

    if (index !== -1) {
      movies[index] = updatedMovie
      this.saveMovies(movies)
    }
  }

  patchMovie(id: string, changes: Partial<Movie>): void {
    
    const movies: Movie[] = this.getMovies()
    const index: number = movies.findIndex(m => m.id === id)

    if (index !== -1){
      movies[index] = {
        ...movies[index],
        ...changes
      }
    }

  this.saveMovies(movies)
  }

  toggleFavorite(id: string): void {

    const movie = this.getMoviesByID(id)

    if (movie) {
      this.patchMovie(id, { isFavorite: !movie.isFavorite })
    }
  }

  seedData() {
  if (!localStorage.getItem(this.storageKey)) {
    const filmesDeExemplo: Movie[] = [
  { id: '1', title: 'Inception', genre: 'Sci-Fi', rating: 9, status: 'watched', releaseDate: '2010-07-16', description: 'A thief steals corporate secrets through dream-sharing technology.', isFavorite: false },
  { id: '2', title: 'The Matrix', genre: 'Action', rating: 10, status: 'watched', releaseDate: '1999-03-31', description: 'A hacker discovers the true nature of reality.', isFavorite: false },
  { id: '3', title: 'Interstellar', genre: 'Sci-Fi', rating: 9, status: 'to-watch', releaseDate: '2014-11-07', description: 'Explorers travel through a wormhole in space.', isFavorite: false },
  { id: '4', title: 'The Godfather', genre: 'Crime', rating: 10, status: 'watched', releaseDate: '1972-03-24', description: 'The aging patriarch transfers control of his empire to his son.', isFavorite: false },
  { id: '5', title: 'Pulp Fiction', genre: 'Crime', rating: 9, status: 'to-watch', releaseDate: '1994-10-14', description: 'Intertwined stories of crime in Los Angeles.', isFavorite: false },
  { id: '6', title: 'The Dark Knight', genre: 'Action', rating: 10, status: 'watched', releaseDate: '2008-07-18', description: 'Batman faces the Joker in Gotham City.', isFavorite: false },
  { id: '7', title: 'Forrest Gump', genre: 'Drama', rating: 9, status: 'skipped', releaseDate: '1994-07-06', description: 'Life story of a simple man who witnesses historical events.', isFavorite: false },
  { id: '8', title: 'Fight Club', genre: 'Drama', rating: 9, status: 'to-watch', releaseDate: '1999-10-15', description: 'An insomniac and a soap salesman form an underground fight club.', isFavorite: false },
  { id: '9', title: 'The Shawshank Redemption', genre: 'Drama', rating: 10, status: 'watched', releaseDate: '1994-09-22', description: 'Two imprisoned men bond over several years.', isFavorite: false },
  { id: '10', title: 'Gladiator', genre: 'Action', rating: 9, status: 'watched', releaseDate: '2000-05-05', description: 'A betrayed general seeks revenge as a gladiator.', isFavorite: false },
  { id: '11', title: 'The Lord of the Rings: The Fellowship of the Ring', genre: 'Fantasy', rating: 10, status: 'to-watch', releaseDate: '2001-12-19', description: 'A hobbit embarks on a journey to destroy a powerful ring.', isFavorite: false },
  { id: '12', title: 'The Lord of the Rings: The Two Towers', genre: 'Fantasy', rating: 9, status: 'to-watch', releaseDate: '2002-12-18', description: 'The fellowship continues their quest to defeat evil.', isFavorite: false },
  { id: '13', title: 'The Lord of the Rings: The Return of the King', genre: 'Fantasy', rating: 10, status: 'to-watch', releaseDate: '2003-12-17', description: 'Final battle to destroy the One Ring.', isFavorite: false },
  { id: '14', title: 'Titanic', genre: 'Romance', rating: 9, status: 'watched', releaseDate: '1997-12-19', description: 'A romance blossoms aboard the ill-fated Titanic.', isFavorite: false },
  { id: '15', title: 'Avatar', genre: 'Sci-Fi', rating: 8, status: 'to-watch', releaseDate: '2009-12-18', description: 'Humans interact with the native Na’vi on Pandora.', isFavorite: false },
  { id: '16', title: 'Avengers: Endgame', genre: 'Action', rating: 9, status: 'watched', releaseDate: '2019-04-26', description: 'The Avengers attempt to reverse Thanos\' actions.', isFavorite: false },
  { id: '17', title: 'Spider-Man: No Way Home', genre: 'Action', rating: 8, status: 'to-watch', releaseDate: '2021-12-17', description: 'Spider-Man deals with multiverse consequences.', isFavorite: false },
  { id: '18', title: 'Joker', genre: 'Drama', rating: 9, status: 'watched', releaseDate: '2019-10-04', description: 'A failed comedian descends into madness.', isFavorite: false },
  { id: '19', title: 'The Lion King', genre: 'Animation', rating: 9, status: 'watched', releaseDate: '1994-06-15', description: 'A young lion prince faces his destiny.', isFavorite: false },
  { id: '20', title: 'Finding Nemo', genre: 'Animation', rating: 8, status: 'skipped', releaseDate: '2003-05-30', description: 'A clownfish searches for his lost son.', isFavorite: false },
  { id: '21', title: 'Back to the Future', genre: 'Sci-Fi', rating: 9, status: 'to-watch', releaseDate: '1985-07-03', description: 'Teenager travels back in time in a DeLorean.', isFavorite: false },
  { id: '22', title: 'Toy Story', genre: 'Animation', rating: 9, status: 'watched', releaseDate: '1995-11-22', description: 'Toys come to life when humans aren’t watching.', isFavorite: false },
  { id: '23', title: 'Shrek', genre: 'Animation', rating: 8, status: 'to-watch', releaseDate: '2001-05-18', description: 'An ogre embarks on a journey to rescue a princess.', isFavorite: false },
  { id: '24', title: 'The Avengers', genre: 'Action', rating: 8, status: 'watched', releaseDate: '2012-05-04', description: 'Marvel superheroes unite to save the world.', isFavorite: false },
  { id: '25', title: 'Guardians of the Galaxy', genre: 'Action', rating: 8, status: 'to-watch', releaseDate: '2014-08-01', description: 'A group of misfits must save the galaxy.', isFavorite: false },
  { id: '26', title: 'Black Panther', genre: 'Action', rating: 9, status: 'watched', releaseDate: '2018-02-16', description: 'The king of Wakanda must defend his nation.', isFavorite: false },
  { id: '27', title: 'Coco', genre: 'Animation', rating: 9, status: 'watched', releaseDate: '2017-11-22', description: 'A boy journeys into the Land of the Dead to find his family.', isFavorite: false },
  { id: '28', title: 'Soul', genre: 'Animation', rating: 8, status: 'to-watch', releaseDate: '2020-12-25', description: 'A musician\'s soul explores the meaning of life.', isFavorite: false },
  { id: '29', title: 'Doctor Strange', genre: 'Action', rating: 8, status: 'to-watch', releaseDate: '2016-11-04', description: 'A surgeon becomes a master of the mystic arts.', isFavorite: false },
  { id: '30', title: 'Wonder Woman', genre: 'Action', rating: 9, status: 'watched', releaseDate: '2017-06-02', description: 'An Amazon princess fights to save the world.', isFavorite: false }
];
    this.saveMovies(filmesDeExemplo);
  }
}
}
