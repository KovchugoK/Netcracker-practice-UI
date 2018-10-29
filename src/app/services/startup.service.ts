import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Startup} from '../model/Startup';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  startupListUrl = '/api/startup/startup-list';


  constructor(private http: HttpClient) {
  }

  getStartupList(): Observable<any> {
    return this.http.get(`${this.startupListUrl}`);
  }

  getStartupById(id: number): Observable<any> {
    return this.http.get('/api/startup/' + id);
  }

  deleteStartup(startupId: string): Observable<void> {
    return this.http.delete<void>('/api/' + startupId);
  }

}
