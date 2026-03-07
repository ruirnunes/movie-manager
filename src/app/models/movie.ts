export interface Movie {
  id: string
  title: string
  genre: string
  duration: number 
  director: string
  cast: string[]
  rating: number
  status: 'to-watch' | 'watching' | 'watched' | 'skipped'
  releaseDate: string
  language: string
  description: string
  notes?: string
  isFavorite: boolean
}