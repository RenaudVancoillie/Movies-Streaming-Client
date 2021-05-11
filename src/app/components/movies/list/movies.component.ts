import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  
  movies: Movie[] = [];

  private delay: number = 500;

  constructor(private movieService: MovieService) { }

  async ngOnInit(): Promise<void> {
    await this.movieService.connect();
    if (this.isLocalStoragesupported() && localStorage.getItem("movies") != null && localStorage.getItem("movies").length > 0) {
      this.movies = JSON.parse(localStorage.getItem("movies"));
      this.getMoviesStreamingWithPointer(this.movies.slice(-1)[0].top250Rank);
    } else {
      this.getMoviesStreaming();
    }
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  getMoviesStreaming(): void {
    this.movieService.getMoviesStreaming(this.delay)
      .subscribe({
        next: (movie: Movie) => this.process(movie),
        complete: () => console.log("All movies have been retrieved"),
        error: (error: any) => console.error("An error has occurred: ", error)
      });
  }

  getMoviesStreamingWithPointer(pointer: number): void {
    this.movieService.getMoviesStreamingWithPointer(this.delay, null, null, pointer)
      .subscribe({
        next: (movie: Movie) => this.process(movie),
        complete: () => console.log("All movies have been retrieved"),
        error: (error: any) => console.error("An error has occurred: ", error)
      });
  }

  process(movie: Movie): void {
    this.movies.push(movie);
    if (this.isLocalStoragesupported()) {
      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
  }

  private isLocalStoragesupported(): boolean {
    try {
      return "localStorage" in window && window["localStorage"] != null;
    } catch(e) {
      return false;
    }
  }

}
