export interface MovieFormValue {
  title: string;
  genre: string;
  duration: number;
  director: string;
  cast: string;          // string do form, será transformada em array
  releaseDate: string;
  rating: number;
  language: string;
  description: string;
  notes?: string;
}