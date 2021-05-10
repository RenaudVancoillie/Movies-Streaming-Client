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
    console.log("connecting");
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.url}/hubs/app`)
      .build();
    
    try {
      await this.hubConnection.start();
      return console.log("connected");
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

  getMoviesStreaming(): any {
    return this.hubConnection.stream("GetAllMoviesStreamingWithChannelReader", 500);  // GetAllMoviesStreamingWithIAsyncEnumerable OR GetAllMoviesStreamingWithChannelReader
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
