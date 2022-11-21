import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<any> {
    return this.http.get('https://movies-api-ll3t.vercel.app/movies');
  }

  public getMovie(id: string): Observable<any> {
    return this.http.get('https://movies-api-ll3t.vercel.app/movies/id/' + id);
  }

  public postMovie(newMovie: any): Observable<any> {
    return this.http.post(
      'https://movies-api-ll3t.vercel.app/movies/create',
      newMovie
    );
  }

  public deleteMovie(id: any): Observable<any> {
    return this.http.delete(
      'https://movies-api-ll3t.vercel.app/movies/delete/' + id
    );
  }
}