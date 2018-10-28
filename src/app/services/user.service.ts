import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  investorListUrl = '/api/investor-list';

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.investorListUrl}`);
  }

}
