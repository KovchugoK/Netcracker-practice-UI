import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../model/Contact';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactUrl = '/api/contacts';

  constructor(private http: HttpClient) {
  }

  getUserContacts(id: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.contactUrl}/${id}`)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteUserContact(yourId: string, otherId: string): Observable<any> {
    return this.http.delete(`${this.contactUrl}/delete`, {
      params: {
        'yourId': yourId,
        'otherId': otherId
      }
    }).pipe(catchError((error: any) => {
      console.log(error);
      return throwError(error.error);
    }));
  }

  addUserInContacts(yourId: string, otherId: string): Observable<any> {
    return this.http.post(`${this.contactUrl}/add`,
      {
        'yourId': yourId,
        'otherId': otherId
      }).pipe(catchError((error: any) => {
      console.log(error);
      return throwError(error.error);
    }));
  }
}
