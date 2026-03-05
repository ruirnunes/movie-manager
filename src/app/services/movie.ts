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

  seedData() {
  if (!localStorage.getItem(this.storageKey)) {
    const filmesDeExemplo: Movie[] = [
  { id: '1', title: 'Inception', genre: 'Sci-Fi', rating: 9, status: 'watched', releaseDate: '2010-07-16', description: 'A thief who steals corporate secrets through dream-sharing technology.' },
  { id: '2', title: 'The Matrix', genre: 'Action', rating: 10, status: 'watched', releaseDate: '1999-03-31', description: 'A hacker learns about the true nature of reality.' },
  { id: '3', title: 'Interstellar', genre: 'Sci-Fi', rating: 9, status: 'to-watch', releaseDate: '2014-11-07', description: 'Explorers travel through a wormhole to save humanity.' },
  { id: '4', title: 'The Godfather', genre: 'Crime', rating: 10, status: 'watched', releaseDate: '1972-03-24', description: 'The aging patriarch of a crime dynasty transfers control to his son.' },
  { id: '5', title: 'Avengers: Endgame', genre: 'Action', rating: 8, status: 'skipped', releaseDate: '2019-04-26', description: 'The Avengers assemble after Infinity War.' },
  { id: '6', title: 'Parasite', genre: 'Thriller', rating: 9, status: 'watched', releaseDate: '2019-05-30', description: 'Class discrimination threatens a newly formed symbiotic relationship.' },
  { id: '7', title: 'Spirited Away', genre: 'Animation', rating: 10, status: 'to-watch', releaseDate: '2001-07-20', description: 'A 10-year-old girl wanders into a world ruled by spirits.' },
  { id: '8', title: 'The Dark Knight', genre: 'Action', rating: 10, status: 'watched', releaseDate: '2008-07-18', description: 'Batman faces the menace known as the Joker.' },
  { id: '9', title: 'Pulp Fiction', genre: 'Crime', rating: 9, status: 'watching', releaseDate: '1994-10-14', description: 'Lives of hitmen, a boxer, and a gangster’s wife intertwine.' },
  { id: '10', title: 'Coco', genre: 'Animation', rating: 8, status: 'watched', releaseDate: '2017-11-22', description: 'A boy enters the Land of the Dead to find his great-grandfather.' },
  { id: '11', title: 'Avatar', genre: 'Sci-Fi', rating: 7, status: 'to-watch', releaseDate: '2009-12-18', description: 'A marine on an alien planet.' },
  { id: '12', title: 'Titanic', genre: 'Romance', rating: 8, status: 'watched', releaseDate: '1997-12-19', description: 'A love story aboard the ill-fated Titanic.' },
  { id: '13', title: 'Joker', genre: 'Drama', rating: 9, status: 'watched', releaseDate: '2019-10-04', description: 'The origin story of the Joker.' },
  { id: '14', title: 'Guardians of the Galaxy', genre: 'Action', rating: 8, status: 'to-watch', releaseDate: '2014-08-01', description: 'A group of intergalactic criminals must save the universe.' },
  { id: '15', title: 'Toy Story', genre: 'Animation', rating: 9, status: 'watched', releaseDate: '1995-11-22', description: 'Toys come to life when humans are not present.' },
  { id: '16', title: 'The Shawshank Redemption', genre: 'Drama', rating: 10, status: 'watched', releaseDate: '1994-09-23', description: 'Two imprisoned men bond over years.' },
  { id: '17', title: 'Frozen', genre: 'Animation', rating: 8, status: 'to-watch', releaseDate: '2013-11-27', description: 'A princess with ice powers tries to save her kingdom.' },
  { id: '18', title: 'The Lion King', genre: 'Animation', rating: 9, status: 'watched', releaseDate: '1994-06-24', description: 'A lion cub prince flees his kingdom only to return as an adult.' },
  { id: '19', title: 'Avengers: Infinity War', genre: 'Action', rating: 9, status: 'watched', releaseDate: '2018-04-27', description: 'The Avengers face Thanos for the Infinity Stones.' },
  { id: '20', title: 'La La Land', genre: 'Romance', rating: 8, status: 'to-watch', releaseDate: '2016-12-09', description: 'A musician and an actress fall in love in Los Angeles.' },
  { id: '21', title: 'Doctor Strange', genre: 'Action', rating: 7, status: 'skipped', releaseDate: '2016-11-04', description: 'A surgeon learns the mystic arts after a car accident.' },
  { id: '22', title: 'The Prestige', genre: 'Drama', rating: 9, status: 'watched', releaseDate: '2006-10-20', description: 'Two rival magicians compete for supremacy.' },
  { id: '23', title: 'Shrek', genre: 'Animation', rating: 8, status: 'watched', releaseDate: '2001-05-18', description: 'An ogre embarks on a quest to rescue a princess.' },
  { id: '24', title: 'Fight Club', genre: 'Drama', rating: 9, status: 'watched', releaseDate: '1999-10-15', description: 'An insomniac office worker crosses paths with a soap maker.' },
  { id: '25', title: 'Moana', genre: 'Animation', rating: 8, status: 'to-watch', releaseDate: '2016-11-23', description: 'A girl sets sail to save her island and discover herself.' }
];
    this.saveMovies(filmesDeExemplo);
  }
}
}
