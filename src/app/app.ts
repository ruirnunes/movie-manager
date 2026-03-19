import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css' 
})

export class AppComponent {
  private router = inject(Router);  // inject() em vez de constructor
  showNavbar = true;

  constructor() {
    // escuta mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          // esconde navbar se estiver na página de login/sign up
          this.showNavbar = !(event.url === '/' || event.url === '/auth');
        }
      });
  }
}

let x = 1;
