import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  accountUrl = '/api/account-list';

   findAccountById(id:string): Observable<any>{
    return this.http.get(`${this.accountUrl+'/'+id}`);
  }
}
