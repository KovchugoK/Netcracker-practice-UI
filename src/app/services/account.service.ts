import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Account} from '../model/Account';
import {DetailAccountDTO} from '../model/DetailAccountDTO';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  accountUrl = '/api/account/';

   findAccountById(id:string): Observable<Account>{
    return this.http.get<Account>(`${this.accountUrl+id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateAccount(detailAccountDTO: any): Observable<any> {
     console.log(detailAccountDTO);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put<any>(this.accountUrl+'update/'+detailAccountDTO.id, detailAccountDTO, options)
      .pipe(catchError((error: any) => throwError(error.error)));
   }

  createAccount(detailAccountDTO: DetailAccountDTO): void {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.post(this.accountUrl+'create/', detailAccountDTO, options);
  }

  deleteAccount(id:string):  Observable<any> {
    return this.http.delete(this.accountUrl+'delete/'+id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateAccountBalance(accountId: string, currentBalance: number): Observable<number> {
    return this.http.put<number>(this.accountUrl + 'update-balance/' + accountId, currentBalance)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

}
