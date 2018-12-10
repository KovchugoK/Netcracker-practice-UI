import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {Contact} from '../../model/Contact';
import {NgRedux, select} from '@angular-redux/store';
import {selectContacts} from '../../store/selectors/contacts.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {deleteContactAction, fetchContactsAction} from '../../store/actions/contacts.actions';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @select(selectContacts)
  contacts: Observable<Contact[]>;

  constructor(private contactService: ContactsService, private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    /*this.contactService.getUserContacts(this.route.snapshot.paramMap.get('id'))
      .subscribe(contacts => this.contacts = contacts);*/
    this.ngRedux.dispatch(fetchContactsAction(this.route.snapshot.paramMap.get('id')));
    this.ngRedux.select(selectContacts);
  }

  deleteContact(otherId: string): void {
    this.ngRedux.dispatch(deleteContactAction(this.ngRedux.getState().currentUserState.currentUser.account.id, otherId));
  }
}
