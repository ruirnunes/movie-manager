export interface Movie {
  id: string
  title: string
  genre: string
  rating: number
  status: 'to-watch' | 'watching' | 'watched' | 'skipped'
  releaseDate: string
  description: string
  isFavorite: boolean
}