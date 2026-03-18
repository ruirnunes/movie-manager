[![CI](https://github.com/ruirnunes/movie-manager/actions/workflows/ci.yml/badge.svg?branch=test-ci&event=pull_request)](https://github.com/ruirnunes/movie-manager/actions/workflows/ci.yml)

# MovieManager

MovieManager is a Single Page Application (SPA) built with Angular that allows users to manage a personal movie collection with authentication, movie tracking, and statistics.

---

## Features

- Authentication with Supabase  
- Add, edit, and delete movies  
- Mark favorites  
- Dashboard with KPIs (total movies, status, average rating)  
- Search, filter, and sort movies  
- Watchlist and watched lists  

---

## How to Use

1. Go to the **Dashboard** to view KPIs and top favorite movies.
2. Access the **Movie List** to browse, filter, search, or sort movies.
3. Click a movie to open **Movie Details** and update status or mark as favorite.
4. Visit **Watchlist** and **Watched List** pages to track your movies.

---

## Run with Docker

### 1. Clone

```bash
git clone https://github.com/ruirnunes/movie-manager.git 
cd movie-manager 
```

### 2. Create `.env`

```bash 
API_URL=http://localhost:3001
SUPABASE_URL=your_supabase_url 
SUPABASE_KEY=your_supabase_anon_key 
```

### 3. Run

```bash
docker-compose up --build 
```

App: http://localhost:4200  

---

## Run without Docker

```bash 
npm install
ng serve --open
```

---

## Project Structure

- `src/app/models/` – TypeScript interfaces for data models (Movie)
- `src/app/services/` – Services for business logic and LocalStorage persistence
- `src/app/components/` – Reusable components (MovieCard, KpiCard)
- `src/app/pages/` – Main pages (Dashboard, Favorites, Movie details, Movie Form Movie List, Watchlist, Watched List)
- `src/app/pipes/` – Custom pipe (date formatting)

---

## Tech Stack

- Frontend: Angular  
- Backend: Node.js (REST API)  
- Database & Auth: Supabase  
- CI/CD: GitHub Actions  
- Deployment: Vercel  
- Containerization: Docker  

---

## CI/CD

Uses :contentReference[oaicite:0]{index=0} for:
- Build and lint  
- Runs on Pull Requests (`develop-idp`)  

---

## Deployment

Deployed on :contentReference[oaicite:1]{index=1} with automatic builds on push.

---

## Branches

- `main` → production  
- `develop-idp` → development  
- feature branches → PR → merge → deploy  

---

## Additional Resources

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page...

## Notes

- `environments/` is ignored  
- Environment variables are managed via `.env`, GitHub Secrets, and Vercel  

---

## Author

Rui Nunes