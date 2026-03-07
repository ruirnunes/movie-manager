import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, NgClass],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})

export class MovieCard {

  // movie data input
  @Input() movie!: Movie;

  // event emitted on status change
  @Output() statusChange = new EventEmitter<{ id: string; status: 'to-watch' | 'watching' | 'watched' | 'skipped' }>();

  // event emitted on delete
  @Output() delete = new EventEmitter<string>();

  // event emitted on favorite toggle
  @Output() favoriteToggle = new EventEmitter<string>();

  constructor(private router: Router) {}

  // navigate to movie details page
  goToDetail(): void {
    this.router.navigate(['/movies', this.movie.id]);
  }

  // emit delete event
  onDelete(): void {
    this.delete.emit(this.movie.id);
  }

  // emit status change event
  onStatusChange(event: Event): void {
    const newStatus: Movie['status'] = (event.target as HTMLSelectElement).value as Movie['status'];
    if (!this.movie) return;
    this.statusChange.emit({ id: this.movie.id, status: newStatus });
  }

  // emit favorite toggle event
  toggleFavorite(): void {
    this.favoriteToggle.emit(this.movie.id);
  }
}