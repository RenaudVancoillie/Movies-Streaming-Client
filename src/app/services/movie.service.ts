import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Movie } from 'src/app/interfaces/movie';
import { MOVIES } from 'src/app/data/mock-movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    return movies;
  }

  getMovie(id: number): Observable<Movie> {
    const movie = of(MOVIES.find(movie => movie.id === id) as Movie)
    return movie;
  }

}
