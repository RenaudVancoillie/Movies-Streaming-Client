import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movies/details/movie.component';
import { MoviesComponent } from './components/movies/list/movies.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
