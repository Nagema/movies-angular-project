import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/services/movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies?: any[];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getAllMovies().subscribe((data: any) => {
      this.movies = [...data];
    });
  }
  ngOnInit(): void {}
}
