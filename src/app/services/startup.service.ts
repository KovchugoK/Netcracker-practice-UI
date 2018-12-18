import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Startup} from '../model/Startup';
import {catchError} from 'rxjs/internal/operators';
import {StartupSearchParams} from '../store/reducers/startup-search-toolbar.reducer';
import {Investment} from '../model/Investment';
import {Account} from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  startupListUrl = '/api/startup/startup-list';

  constructor(private http: HttpClient) {
  }

  getStartupList(): Observable<Startup[]> {
    return this.http.get<Startup[]>(`${this.startupListUrl}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getStartupById(id: string): Observable<Startup> {
    return this.http.get<Startup>('/api/startup/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteStartup(id: string): Observable<any> {
    return this.http.delete('/api/startup/delete/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  updateStartup(startup: Startup): Observable<Startup> {
    return this.http.put<Startup>('/api/startup/update/' + startup.id, startup)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  createStartup(startup: Startup): Observable<Startup> {
    return this.http.post<Startup>('/api/startup/create/', startup)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  searchStartup(startupSearchParams: StartupSearchParams): Observable<Startup[]> {
    return this.http.get<Startup[]>('/api/startup/search-startups/',
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
    return this.http.post<Investment>('/api/startup/make-investment/', {investor: investor, startup: startup,
    sumOfInvestment: sumOfInvestment})
      .pipe(catchError((error: any) => throwError(error.error)));
  }

}
