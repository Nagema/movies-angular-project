import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  id: any;
  movie: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.moviesService.getMovie(this.id).subscribe((data: any) => {
        this.movie = data;
      });
    });
  }
  ngOnInit(): void {}
  delete() {
    this.moviesService.deleteMovie(this.id).subscribe();
  }
}
