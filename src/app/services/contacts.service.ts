import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../model/Contact';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactUrl = '/api/contacts/';

  constructor(private http: HttpClient) {
  }

  getUserContacts(id: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactUrl + id);
  }

  deleteUserContact(yourId: string, otherId: string): Observable<string> {

    return this.http.request<string>('delete', this.contactUrl + 'delete', {
      body: {
        'yourId': yourId,
        'otherId': otherId
      }
    });
  }
}
