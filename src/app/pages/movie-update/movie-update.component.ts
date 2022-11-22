import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from 'src/services/movies.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class MovieUpdateComponent {
  id: any;
  movieInfoId: any;
  movie: any = {
    title: '',
    img: '',
    director: '',
    duration: '',
    genre: '',
    year: '',
    synopsis: '',
  };

  movieForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.moviesService.getMovie(this.id).subscribe((movieData: any) => {
        const { info, ...movie } = movieData;
        const movieInfo = info[0];
        this.movieInfoId = movieInfo._id;
        this.movie = {
          title: movie.title,
          img: movie.img,
          director: movieInfo.director,
          duration: movieInfo.duration,
          genre: movieInfo.genre,
          year: movieInfo.year,
          synopsis: movieInfo.synopsis,
        };
      });
    });
  }
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
      const changeEntries = Object.entries(changes).filter(
        ([key, value]) => value
      );

      const objectChanges = Object.fromEntries(changeEntries);
      this.movie = {
        ...this.movie,
        ...objectChanges,
      };
    });
  }

  goToMovies() {
    this.router.navigate(['/movies']);
  }
  async onSubmit() {
    const { title, img, ...movieRest } = this.movie;
    const movie = {
      title,
      img,
      info: this.movieInfoId,
    };
    const movieInfo = {
      title,
      ...movieRest,
    };
    await lastValueFrom(
      this.moviesService.updateMovieInfo(this.movieInfoId, movieInfo)
    );
    await lastValueFrom(this.moviesService.updateMovie(this.id, movie));
    const result = await Swal.fire({
      title: 'Success!',
      text: 'Movie updated successfully',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    if (result.isConfirmed) {
      this.router.navigate(['/movies/id/' + this.id]);
    }
  }
}
