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

  constructor(private movieService: MovieService) { }

  async ngOnInit(): Promise<void> {
    await this.movieService.connect();
    this.getMoviesStreaming();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  getMoviesStreaming(): void {
    this.movieService.getMoviesStreaming()
      .subscribe({
        next: (movie: Movie) => this.movies.push(movie),
        complete: () => console.log("All movies have been retrieved"),
        error: (error: any) => console.error("An error has occurred: ", error)
      });
  }

}
