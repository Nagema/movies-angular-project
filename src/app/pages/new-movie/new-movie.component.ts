import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from 'src/services/movies.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent implements OnInit {
  infoMovies?: any[];
  newMovie: any = {
    title: '',
    img: '',
    info: '',
  };

  newMovieInfo: any = {
    title: '',
    director: '',
    duration: '',
    genre: '',
    year: '',
    synopsis: '',
  };

  movieForm!: FormGroup;

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      img: ['', [Validators.required]],
      director: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      year: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
    });
    this.movieForm.valueChanges.subscribe((changes) => {
      this.newMovieInfo = changes;
      this.newMovie.title = this.newMovieInfo.title;
      this.newMovie.img = this.newMovieInfo.img;
    });
  }
  Swal = require('sweetalert2');
  async onSubmit() {
    const movieInfo = await lastValueFrom(
      this.moviesService.postMovieInfo(this.newMovieInfo)
    );
    this.newMovie.info = movieInfo._id;
    await this.moviesService.postMovie(this.newMovie).subscribe();
    this.router.navigate(['/movies']);
    Swal.fire({
      title: 'Success!',
      text: 'Movie created successfully',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}
