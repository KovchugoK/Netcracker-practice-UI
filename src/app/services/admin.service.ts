import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Startup} from '../model/Startup';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  blockStartup(id: string): Observable<any> {
    console.log(id);
    return this.http.post('/api/admin/block/startup', id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  unBlockStartup(id: string): Observable<any> {
    console.log(id);
    return this.http.post('/api/admin/unblock/startup', id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  blockUser(user: User): Observable<any> {
    return this.http.post('/api/admin/block/user/', user)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  unBlockUser(user: User): Observable<any> {
    return this.http.post('/api/admin/unblock/user/', user)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
