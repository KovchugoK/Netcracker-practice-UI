import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs/index";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ResetPassword} from "../model/ResetPassword";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  userUrl = '/api/user/';

  constructor(private http: HttpClient) { }

  sendEmail(email: string): Observable<any> {
    console.log(email+'send');
    return this.http.post<any>(this.userUrl+'resetPassword',
      null, {
         params: new HttpParams().set('email', email)
  });
  }

  updatePassword(id: string, token: string, password: string): Observable<any> {
    console.log(id+token+password);
    return this.http.post<any>(this.userUrl+'savePassword',
      {
        id: id,
        token: token,
        password: password
      }).pipe(catchError((error: any) => throwError(error.error)));
  }

}
