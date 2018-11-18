import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  specialistListUrl = '/api/specialist-list';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getSpecialistList(): Observable<any> {
    return this.http.get(`${this.specialistListUrl}`);
  }

  post(account: Account): Observable<any> {
    return this.http.post(`${this.specialistListUrl}`, account, {headers: this.headers});
  }
}
