import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Startup} from '../model/Startup';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  blockStartup(startup: Startup): Observable<any> {
    return this.http.post('/api/admin/block/startup', startup)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  unBlockStartup(startup: Startup): Observable<any> {
    return this.http.post('/api/admin/unblock/startup', startup)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  blockUser(id: string): Observable<any> {
    return this.http.get('/api/admin/block/user/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  unBlockUser(id: string): Observable<any> {
    return this.http.get('/api/admin/unblock/user/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
