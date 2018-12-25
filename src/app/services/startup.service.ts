import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Startup} from '../model/Startup';
import {catchError} from 'rxjs/operators';
import {StartupSearchParams} from '../store/reducers/startup-search-toolbar.reducer';
import {Investment} from '../model/Investment';
import {Account} from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  startupUrl = '/api/startup';

  constructor(private http: HttpClient) {
  }

  getStartupList(): Observable<Startup[]> {
    return this.http.get<Startup[]>(`${this.startupUrl}/startup-list`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getStartupById(id: string): Observable<Startup> {
    return this.http.get<Startup>(`${this.startupUrl}/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteStartup(id: string): Observable<any> {
    return this.http.delete(`${this.startupUrl}/delete/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateStartup(startup: Startup): Observable<Startup> {
    return this.http.put<Startup>(`${this.startupUrl}/update/${startup.id}`, startup)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createStartup(startup: Startup): Observable<Startup> {
    return this.http.post<Startup>(`${this.startupUrl}/create`, startup)
      .pipe(catchError((error: any) => throwError(error)));
  }

  searchStartup(startupSearchParams: StartupSearchParams): Observable<Startup[]> {
    return this.http.get<Startup[]>(`${this.startupUrl}/search-startups`,
      {
        params: {
          startupNameContains: startupSearchParams.startupNameContains,
          creator: startupSearchParams.creatorNameContains,
          sortBy: startupSearchParams.sortType.value.sortBy,
          sortDirection: startupSearchParams.sortType.value.sortDirection,
          accountID: startupSearchParams.accountID
        }
      })
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  makeInvestment(investor: Account, startup: Startup, sumOfInvestment: number): Observable<Investment> {
    return this.http.post<Investment>(`${this.startupUrl}/make-investment`, {
      investor: investor, startup: startup,
      sumOfInvestment: sumOfInvestment
    })
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  checkPermissionToEdit(accountId: string, startupId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.startupUrl}/permission-to-edit`,
      {
        params:
          {
            accountId: accountId,
            startupId: startupId
          }
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

}
