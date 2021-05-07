import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Movie } from 'src/app/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url: string = 'https://localhost:44364';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    const endpoint = `${this.url}/api/movies`;
    return this.http.get<Movie[]>(endpoint).pipe(
        catchError(this.handleError<Movie[]>('getMovies', []))
      )
  }

  getMovie(id: number): Observable<Movie> {
    const endpoint = `${this.url}/api/movies/${id}`;
    return this.http.get<Movie>(endpoint).pipe(
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
