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

  getStartupById(id: string): Observable<any> {
    return this.http.get('/api/startup/' + id);
  }

  deleteStartup(id: string): Observable<any> {
    return this.http.delete('/api/startup/delete/' + id);
  }

  updateStartup(id: string, startup: Startup): Observable<any> {
    return this.http.put('/api/startup/update/' + id, startup);
  }

  createStartup(startup: Startup): Observable<any> {
    return this.http.post('/api/startup/create/', startup);
  }


}
