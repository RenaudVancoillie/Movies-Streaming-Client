import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalR';

import { Movie } from 'src/app/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url: string = 'https://localhost:5001';
  private hubConnection: signalR.HubConnection;

  constructor(private http: HttpClient) { }

  public async connect(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.url}/hubs/app`)
      .build();
    
    try {
      await this.hubConnection.start();
    } catch (error) {
      return console.error("Error while trying to connect to the app hub: ", error);
    }
  }

  public disconnect(): void {
    this.hubConnection.stop();
  }

  getMovies(): Observable<Movie[]> {
    const endpoint = `${this.url}/api/movies`;
    return this.http.get<Movie[]>(endpoint).pipe(
      catchError(this.handleError<Movie[]>('getMovies', []))
    )
  }

  getMoviesStreaming(delay: number): signalR.IStreamResult<Movie> {
    return this.hubConnection.stream("GetAllMoviesStreamingWithChannelReader", delay);  // GetAllMoviesStreamingWithIAsyncEnumerable OR GetAllMoviesStreamingWithChannelReader
  }

  getMoviesStreamingWithPointer(delay: number, count: number, before: number, after: number): signalR.IStreamResult<Movie> {
    return this.hubConnection.stream("GetPaginatedMoviesStreamingWithIAsyncEnumerable", delay, count, before, after) // GetPaginatedMoviesStreamingWithIAsyncEnumerable OR GetPaginatedMoviesStreamingWithChannelReader
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
