// movie model interface
export interface Movie {
  id: string;                 // unique movie id
  title: string;              // movie title
  genre: string;              // movie genre
  duration: number;           // duration in minutes
  director: string;           // director name
  cast: string[];             // array of actor names
  rating: number;             // movie rating (e.g., 0-10)
  status: 'to-watch' | 'watching' | 'watched' | 'skipped'; // current watch status
  releaseDate: string;        // release date in ISO format
  language: string;           // original language
  description: string;        // brief description
  notes?: string;             // optional notes
  isFavorite: boolean;        // favorite flag
}