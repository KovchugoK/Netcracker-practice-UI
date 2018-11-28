import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Startup} from '../model/Startup';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  startupListUrl = '/api/startup/startup-list';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  params: HttpParams;
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

  searchStartup(startupNameContains: string, sortType: string): Observable<Startup[]> {
    this.params = new HttpParams().set('startupNameContains', startupNameContains)
      .append('sortBy', sortType.split(' ')[0]).append('sortType', sortType.split(' ')[1]);
    return this.http.get<Startup[]>('/api/startup/search-startups/', {headers: this.headers, params: this.params})
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  getMyStartupList(id: string): Observable<Startup[]> {
    this.params = new HttpParams().set('id', id);
    return this.http.get<Startup[]>('/api/startup/my-startups', {headers: this.headers, params: this.params})
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
