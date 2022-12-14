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

  public postMovieInfo(newMovieInfo: any): Observable<any> {
    return this.http.post(
      'https://movies-api-ll3t.vercel.app/info/create',
      newMovieInfo
    );
  }

  public updateMovieInfo(id: string, updateMovie: any): Observable<any> {
    return this.http.put('http://localhost:8080/info/edit/' + id, updateMovie);
  }

  public updateMovie(id: string, updateMovie: any): Observable<any> {
    return this.http.put(
      'http://localhost:8080/movies/edit/' + id,
      updateMovie
    );
  }

  public deleteMovie(id: string): Observable<any> {
    return this.http.delete('http://localhost:8080/movies/delete/' + id);
  }
}
