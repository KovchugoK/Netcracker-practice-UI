import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  investorListUrl = '/api/investor-list';

  constructor(private http: HttpClient) {
  }

  getInvestorList(): Observable<any> {
    return this.http.get(`${this.investorListUrl}`);
  }

}
