import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

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

  // seed initial data if empty
  seedData(): void {
    if (!localStorage.getItem(this.storageKey)) {
      const filmesDeExemplo: Movie[] = [
        { id: '1', title: 'Inception', genre: 'Sci-Fi', duration: 148, director: 'Christopher Nolan', cast: ['Leonardo DiCaprio','Joseph Gordon-Levitt','Elliot Page'], rating: 9, status: 'watched', releaseDate: '2010-07-16', language: 'English', description: 'A thief steals corporate secrets through dream-sharing technology.', notes: 'Mind-bending thriller.', isFavorite: false },
        { id: '2', title: 'The Matrix', genre: 'Action', duration: 136, director: 'Lana Wachowski & Lilly Wachowski', cast: ['Keanu Reeves','Laurence Fishburne','Carrie-Anne Moss'], rating: 10, status: 'watched', releaseDate: '1999-03-31', language: 'English', description: 'A hacker discovers the true nature of reality.', notes: 'Classic sci-fi.', isFavorite: false },
        { id: '3', title: 'Interstellar', genre: 'Sci-Fi', duration: 169, director: 'Christopher Nolan', cast: ['Matthew McConaughey','Anne Hathaway','Jessica Chastain'], rating: 9, status: 'to-watch', releaseDate: '2014-11-07', language: 'English', description: 'Explorers travel through a wormhole in space.', notes: '', isFavorite: false },
        { id: '4', title: 'The Godfather', genre: 'Crime', duration: 175, director: 'Francis Ford Coppola', cast: ['Marlon Brando','Al Pacino','James Caan'], rating: 10, status: 'watched', releaseDate: '1972-03-24', language: 'English', description: 'The aging patriarch transfers control of his empire to his son.', notes: '', isFavorite: false },
        { id: '5', title: 'Pulp Fiction', genre: 'Crime', duration: 154, director: 'Quentin Tarantino', cast: ['John Travolta','Uma Thurman','Samuel L. Jackson'], rating: 9, status: 'to-watch', releaseDate: '1994-10-14', language: 'English', description: 'Intertwined stories of crime in Los Angeles.', notes: '', isFavorite: false },
        { id: '6', title: 'The Dark Knight', genre: 'Action', duration: 152, director: 'Christopher Nolan', cast: ['Christian Bale','Heath Ledger','Aaron Eckhart'], rating: 10, status: 'watched', releaseDate: '2008-07-18', language: 'English', description: 'Batman faces the Joker in Gotham City.', notes: '', isFavorite: false },
        { id: '7', title: 'Forrest Gump', genre: 'Drama', duration: 142, director: 'Robert Zemeckis', cast: ['Tom Hanks','Robin Wright','Gary Sinise'], rating: 9, status: 'skipped', releaseDate: '1994-07-06', language: 'English', description: 'Life story of a simple man who witnesses historical events.', notes: '', isFavorite: false },
        { id: '8', title: 'Fight Club', genre: 'Drama', duration: 139, director: 'David Fincher', cast: ['Brad Pitt','Edward Norton','Helena Bonham Carter'], rating: 9, status: 'to-watch', releaseDate: '1999-10-15', language: 'English', description: 'An insomniac and a soap salesman form an underground fight club.', notes: '', isFavorite: false },
        { id: '9', title: 'The Shawshank Redemption', genre: 'Drama', duration: 142, director: 'Frank Darabont', cast: ['Tim Robbins','Morgan Freeman','Bob Gunton'], rating: 10, status: 'watched', releaseDate: '1994-09-22', language: 'English', description: 'Two imprisoned men bond over several years.', notes: '', isFavorite: false },
        { id: '10', title: 'Gladiator', genre: 'Action', duration: 155, director: 'Ridley Scott', cast: ['Russell Crowe','Joaquin Phoenix','Connie Nielsen'], rating: 9, status: 'watched', releaseDate: '2000-05-05', language: 'English', description: 'A betrayed general seeks revenge as a gladiator.', notes: '', isFavorite: false },
        { id: '11', title: 'The Lord of the Rings: The Fellowship of the Ring', genre: 'Fantasy', duration: 178, director: 'Peter Jackson', cast: ['Elijah Wood','Ian McKellen','Orlando Bloom'], rating: 10, status: 'to-watch', releaseDate: '2001-12-19', language: 'English', description: 'A hobbit embarks on a journey to destroy a powerful ring.', notes: '', isFavorite: false },
        { id: '12', title: 'The Lord of the Rings: The Two Towers', genre: 'Fantasy', duration: 179, director: 'Peter Jackson', cast: ['Elijah Wood','Ian McKellen','Viggo Mortensen'], rating: 9, status: 'to-watch', releaseDate: '2002-12-18', language: 'English', description: 'The fellowship continues their quest to defeat evil.', notes: '', isFavorite: false },
        { id: '13', title: 'The Lord of the Rings: The Return of the King', genre: 'Fantasy', duration: 201, director: 'Peter Jackson', cast: ['Elijah Wood','Ian McKellen','Viggo Mortensen'], rating: 10, status: 'to-watch', releaseDate: '2003-12-17', language: 'English', description: 'Final battle to destroy the One Ring.', notes: '', isFavorite: false },
        { id: '14', title: 'Titanic', genre: 'Romance', duration: 195, director: 'James Cameron', cast: ['Leonardo DiCaprio','Kate Winslet','Billy Zane'], rating: 9, status: 'watched', releaseDate: '1997-12-19', language: 'English', description: 'A romance blossoms aboard the ill-fated Titanic.', notes: '', isFavorite: false },
        { id: '15', title: 'Avatar', genre: 'Sci-Fi', duration: 162, director: 'James Cameron', cast: ['Sam Worthington','Zoe Saldana','Sigourney Weaver'], rating: 8, status: 'to-watch', releaseDate: '2009-12-18', language: 'English', description: 'Humans interact with the native Na’vi on Pandora.', notes: '', isFavorite: false },
        { id: '16', title: 'Avengers: Endgame', genre: 'Action', duration: 181, director: 'Anthony & Joe Russo', cast: ['Robert Downey Jr.','Chris Evans','Scarlett Johansson'], rating: 9, status: 'watched', releaseDate: '2019-04-26', language: 'English', description: 'The Avengers attempt to reverse Thanos\' actions.', notes: '', isFavorite: false },
        { id: '17', title: 'Spider-Man: No Way Home', genre: 'Action', duration: 148, director: 'Jon Watts', cast: ['Tom Holland','Zendaya','Benedict Cumberbatch'], rating: 8, status: 'to-watch', releaseDate: '2021-12-17', language: 'English', description: 'Spider-Man deals with multiverse consequences.', notes: '', isFavorite: false },
        { id: '18', title: 'Joker', genre: 'Drama', duration: 122, director: 'Todd Phillips', cast: ['Joaquin Phoenix','Robert De Niro','Zazie Beetz'], rating: 9, status: 'watched', releaseDate: '2019-10-04', language: 'English', description: 'A failed comedian descends into madness.', notes: '', isFavorite: false },
        { id: '19', title: 'The Lion King', genre: 'Animation', duration: 88, director: 'Roger Allers & Rob Minkoff', cast: ['Matthew Broderick','Jeremy Irons','James Earl Jones'], rating: 9, status: 'watched', releaseDate: '1994-06-15', language: 'English', description: 'A young lion prince faces his destiny.', notes: '', isFavorite: false },
        { id: '20', title: 'Finding Nemo', genre: 'Animation', duration: 100, director: 'Andrew Stanton', cast: ['Albert Brooks','Ellen DeGeneres','Alexander Gould'], rating: 8, status: 'skipped', releaseDate: '2003-05-30', language: 'English', description: 'A clownfish searches for his lost son.', notes: '', isFavorite: false },
        { id: '21', title: 'Back to the Future', genre: 'Sci-Fi', duration: 116, director: 'Robert Zemeckis', cast: ['Michael J. Fox','Christopher Lloyd','Lea Thompson'], rating: 9, status: 'to-watch', releaseDate: '1985-07-03', language: 'English', description: 'Teenager travels back in time in a DeLorean.', notes: '', isFavorite: false },
        { id: '22', title: 'Toy Story', genre: 'Animation', duration: 81, director: 'John Lasseter', cast: ['Tom Hanks','Tim Allen','Don Rickles'], rating: 9, status: 'watched', releaseDate: '1995-11-22', language: 'English', description: 'Toys come to life when humans aren’t watching.', notes: '', isFavorite: false },
        { id: '23', title: 'Shrek', genre: 'Animation', duration: 90, director: 'Andrew Adamson', cast: ['Mike Myers','Eddie Murphy','Cameron Diaz'], rating: 8, status: 'to-watch', releaseDate: '2001-05-18', language: 'English', description: 'An ogre embarks on a journey to rescue a princess.', notes: '', isFavorite: false },
        { id: '24', title: 'The Avengers', genre: 'Action', duration: 143, director: 'Joss Whedon', cast: ['Robert Downey Jr.','Chris Evans','Mark Ruffalo'], rating: 8, status: 'watched', releaseDate: '2012-05-04', language: 'English', description: 'Marvel superheroes unite to save the world.', notes: '', isFavorite: false },
        { id: '25', title: 'Guardians of the Galaxy', genre: 'Action', duration: 121, director: 'James Gunn', cast: ['Chris Pratt','Zoe Saldana','Dave Bautista'], rating: 8, status: 'to-watch', releaseDate: '2014-08-01', language: 'English', description: 'A group of misfits must save the galaxy.', notes: '', isFavorite: false },
        { id: '26', title: 'Black Panther', genre: 'Action', duration: 134, director: 'Ryan Coogler', cast: ['Chadwick Boseman','Michael B. Jordan','Lupita Nyong\'o'], rating: 9, status: 'watched', releaseDate: '2018-02-16', language: 'English', description: 'The king of Wakanda must defend his nation.', notes: '', isFavorite: false },
        { id: '27', title: 'Coco', genre: 'Animation', duration: 105, director: 'Lee Unkrich', cast: ['Anthony Gonzalez','Gael García Bernal','Benjamin Bratt'], rating: 9, status: 'watched', releaseDate: '2017-11-22', language: 'English', description: 'A boy journeys into the Land of the Dead to find his family.', notes: '', isFavorite: false },
        { id: '28', title: 'Soul', genre: 'Animation', duration: 100, director: 'Pete Docter', cast: ['Jamie Foxx','Tina Fey','Graham Norton'], rating: 8, status: 'to-watch', releaseDate: '2020-12-25', language: 'English', description: 'A musician\'s soul explores the meaning of life.', notes: '', isFavorite: false },
        { id: '29', title: 'Doctor Strange', genre: 'Action', duration: 115, director: 'Scott Derrickson', cast: ['Benedict Cumberbatch','Chiwetel Ejiofor','Rachel McAdams'], rating: 8, status: 'to-watch', releaseDate: '2016-11-04', language: 'English', description: 'A surgeon becomes a master of the mystic arts.', notes: '', isFavorite: false },
        { id: '30', title: 'Wonder Woman', genre: 'Action', duration: 141, director: 'Patty Jenkins', cast: ['Gal Gadot','Chris Pine','Robin Wright'], rating: 9, status: 'watched', releaseDate: '2017-06-02', language: 'English', description: 'An Amazon princess fights to save the world.', notes: '', isFavorite: false }
      ];
      this.saveMovies(filmesDeExemplo);
    }
  }
}
