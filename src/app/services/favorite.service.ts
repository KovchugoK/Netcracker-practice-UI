import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoritetUrl = '/api/favorite';

  constructor(private http: HttpClient) {
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.favoritetUrl}`);
  }
}
