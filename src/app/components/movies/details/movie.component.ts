import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMovie(id);
  }
  
  getMovie(id: number): void {
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

}
