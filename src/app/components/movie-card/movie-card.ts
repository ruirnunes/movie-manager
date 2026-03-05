import { Component, EventEmitter,Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink,NgClass ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!: Movie
  @Output() statusChange = new EventEmitter<{id:string, status:'to-watch'|'watching'|'watched'|'skipped'}>();
  @Output() delete = new EventEmitter<string>()

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/movies', this.movie.id])
  }
  
  onDelete(){
    this.delete.emit(this.movie.id)
  }

  onStatusChange(event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value as Movie['status'];
    if (!this.movie) return;
    this.statusChange.emit({ id: this.movie.id, status: newStatus });
  }
}
