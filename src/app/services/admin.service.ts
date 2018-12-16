import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  blockStartup(id: string): Observable<any> {
    return this.http.get('/api/admin/block/startup/' + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
  unBlockStartup(id: string): Observable<any> {
    return this.http.get('/api/admin/unblock/startup/' + id)
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
