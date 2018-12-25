import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/Account';
import {SearchObject} from "../model/SearchObject";
import {Favorite} from "../model/Favorite";

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  specialistListUrl = '/api/specialist-list';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  params: HttpParams;

  investorListUrl = '/api/investor-list';

  constructor(private http: HttpClient) {
  }


  getSpecialistList(searchObj: SearchObject): Observable<any> {
    let params = new HttpParams();
    for (const key in searchObj) {
      const val = searchObj[key];
      if (val) {
        params = params.set(key, val);
      }
    }
    return this.http.get(`${this.specialistListUrl}`, {params: params});
  }

  post(favorite: Favorite, id: string): Observable<any> {
    return this.http.post(`${this.specialistListUrl}` + '/' + id, favorite, {headers: this.headers});
  }

  getInvestorList(): Observable<any> {
    return this.http.get(`${this.investorListUrl}`);
  }

 /* post(account: Account): Observable<any> {
    return this.http.post(`${this.investorListUrl}`, account, {headers: this.headers});
  }*/
}
