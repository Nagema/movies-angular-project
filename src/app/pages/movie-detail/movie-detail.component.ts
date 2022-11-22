import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';
import Swal from 'sweetalert2';
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
    private moviesService: MoviesService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.moviesService.getMovie(this.id).subscribe((data: any) => {
        this.movie = data;
      });
    });
  }
  ngOnInit(): void {}

  goToUpdate() {
    this.router.navigate(['movie/edit/' + this.id]);
  }

  Swal = require('sweetalert2');

  delete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFCA2B',
      cancelButtonColor: '#555555',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.moviesService.deleteMovie(this.id).subscribe();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.router.navigate(['/movies']);
      }
    });
  }
}
