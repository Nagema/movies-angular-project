import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies?: any[];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getAllMovies().subscribe((data: any) => {
      this.movies = [...data];
      console.log(this.movies);
    });
  }
  ngOnInit(): void {}
}
