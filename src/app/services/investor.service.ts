import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from "../model/Account";

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  investorListUrl = '/api/investor-list';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getInvestorList(): Observable<any> {
    return this.http.get(`${this.investorListUrl}`);
  }

  post(account: Account): Observable<any> {
    return this.http.post(`${this.investorListUrl}`, account, {headers: this.headers});
  }

}
