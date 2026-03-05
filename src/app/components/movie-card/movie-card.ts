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
  @Output() delete = new EventEmitter<string>()

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/movies', this.movie.id])
  }
  
  onDelete(){
    this.delete.emit(this.movie.id)
  }
}
