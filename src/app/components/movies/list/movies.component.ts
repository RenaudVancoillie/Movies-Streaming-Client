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

  selectedMovie?: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

}
