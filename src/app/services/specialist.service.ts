import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  specialistListUrl = '/api/specialist-list';

  constructor(private http: HttpClient) {
  }

  getSpecialistList(): Observable<any> {
    return this.http.get(`${this.specialistListUrl}`);
  }
}
