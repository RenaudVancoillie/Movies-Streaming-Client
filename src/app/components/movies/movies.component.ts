import { Component, OnInit } from '@angular/core';

import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movie: Movie = {
    id: 1,
    imdbId: '0111161',
    title: 'The Shawshank Redemption',
    coverUrl: 'The Shawshank Redemption.jpg',
    year: 1994,
    originalAirDate: '23 Sep 1994 (Mexico)',
    kind: 'movie',
    rating: 93.00,
    plot: null,
    top250Rank: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
