import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Startup} from '../model/Startup';
import {catchError} from 'rxjs/internal/operators';

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


}
