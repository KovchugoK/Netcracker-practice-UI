import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from "../model/Account";
import {DetailAccountDTO} from "../model/DetailAccountDTO";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  accountUrl = '/api/account/';

   findAccountById(id:string): Observable<Account>{
    return this.http.get<Account>(`${this.accountUrl+id}`);
  }

  updateAccount(detailAccountDTO: any): Observable<any> {
     console.log(detailAccountDTO);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put<any>(this.accountUrl+'update/'+detailAccountDTO.id, detailAccountDTO, options);
   }

  createAccount(detailAccountDTO: DetailAccountDTO): void {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.post(this.accountUrl+'create/', detailAccountDTO, options).subscribe(
      res=> console.log(res)
    );
  }

  deleteAccount(id:string):  Observable<any> {
    return this.http.delete(this.accountUrl+'delete/'+id);
  }

}
