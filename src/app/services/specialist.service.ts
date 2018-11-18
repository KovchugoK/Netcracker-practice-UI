import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  _businessRole = '';
  specialistListUrl = '/api/specialist-list';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  params: HttpParams;
  constructor(private http: HttpClient) {
  }

  set businessRole(businessRole: string) {
    this._businessRole = businessRole;
  }

  get businessRole(): string {
    return this._businessRole;
  }

  getSpecialistList(): Observable<any> {
    this.params = new HttpParams().set("businessRole", this.businessRole);
    return this.http.get(`${this.specialistListUrl}`, {headers: this.headers, params: this.params});
  }

  post(account: Account): Observable<any> {
    return this.http.post(`${this.specialistListUrl}`, account, {headers: this.headers});
  }
}
