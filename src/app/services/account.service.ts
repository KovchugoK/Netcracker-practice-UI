import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Account} from '../model/Account';
import {DetailAccountDTO} from '../model/DetailAccountDTO';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  accountUrl = '/api/account/';

  findAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.accountUrl + id}`);
  }

  updateAccount(detailAccountDTO: DetailAccountDTO): void {
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.http.put(this.accountUrl + 'update/' + detailAccountDTO.id, detailAccountDTO, options).subscribe(
      res => console.log(res)
    );
  }

  updateAccountBalance(accountId: string, currentBalance: number): Observable<Account> {
    return this.http.put<Account>(this.accountUrl + 'update-balance/' + accountId, currentBalance)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

}
