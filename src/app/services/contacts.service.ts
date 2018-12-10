import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../model/Contact';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactUrl = '/api/contacts/';

  constructor(private http: HttpClient) {
  }

  getUserContacts(id: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactUrl + id)
      .pipe(catchError((error: any) => throwError(error.error)));
  }

  deleteUserContact(yourId: string, otherId: string): Observable<string> {

    return this.http.request<string>('delete', this.contactUrl + 'delete', {
      body: {
        'yourId': yourId,
        'otherId': otherId
      }
    })
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}
