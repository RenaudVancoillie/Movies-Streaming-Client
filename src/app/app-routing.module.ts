import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from 'src/app/components/movies/details/movie.component';
import { MoviesComponent } from 'src/app/components/movies/list/movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
