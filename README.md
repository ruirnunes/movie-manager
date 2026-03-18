# MovieManager

MovieManager is a Single Page Application (SPA) built with Angular 21 that allows users to manage a personal movie collection. Users can add, edit, and remove movies, track viewing status, mark favorites, and view KPIs for their collection.

## Project Description

The goal of this project is to consolidate skills in JavaScript, TypeScript, and Angular, demonstrating a functional SPA with clean architecture, strict typing, reusable components, and state management. The chosen theme is Movie/Series Catalog, enabling users to manage a personal watchlist with ratings, favorites, and statistics.

## Features

- **Dashboard with KPIs**:
  - Total movies
  - Movies watched, to watch, watching, and skipped
  - Average rating
  - Top 3 favorite movies by rating (displayed as cards)
- **Movie List**:
  - Filter movies by genre
  - Search movies by title
  - Sort movies by rating
- **Movie Details**:
  - View detailed information for each movie
  - Toggle favorite status
  - Update viewing status (To Watch, Watching, Watched, Skipped)
- **Watchlist & Watched List**:
  - Separate pages for movies to watch and movies already watched
  - Move movies between lists by changing status
- **Data Persistence**:
  - All data is stored in LocalStorage
  - Example movies preloaded on first run
- **Component-based Architecture**:
  - MovieCardComponent for displaying movie info
  - KpiCardComponent for dashboard metrics

## Installation

Clone the repository:

```bash
git clone https://github.com/ruirnunes/movie-manager.git
cd movie-manager
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
ng serve
```

Open your browser at `http://localhost:4200/`.  
The application reloads automatically whenever source files are modified.

## Project Structure

- `src/app/models/` – TypeScript interfaces for data models (Movie)
- `src/app/services/` – Services for business logic and LocalStorage persistence
- `src/app/components/` – Reusable components (MovieCard, KpiCard)
- `src/app/pages/` – Main pages (Dashboard, Favorites, Movie details, Movie Form Movie List, Watchlist, Watched List)
- `src/app/pipes/` – Custom pipe (date formatting)

## How to Use

1. Go to the **Dashboard** to view KPIs and top favorite movies.
2. Access the **Movie List** to browse, filter, search, or sort movies.
3. Click a movie to open **Movie Details** and update status or mark as favorite.
4. Visit **Watchlist** and **Watched List** pages to track your movies.

## Technologies Used

- Angular 21
- TypeScript
- LocalStorage for data persistence

## Additional Resources

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page...

