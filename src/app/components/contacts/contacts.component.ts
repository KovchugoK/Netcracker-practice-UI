import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {Contact} from '../../model/Contact';
import {NgRedux, select} from '@angular-redux/store';
import {isLoading, selectContacts} from '../../store/selectors/contacts.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {deleteContactAction, fetchContactsAction} from '../../store/actions/contacts.actions';
import {skipWhile, take} from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @select(selectContacts)
  contacts: Observable<Contact[]>;

  @select(isLoading)
  isLoading: Observable<boolean>;

  constructor(private contactService: ContactsService, private route: ActivatedRoute, private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() =>
        this.ngRedux.dispatch(fetchContactsAction(this.route.snapshot.paramMap.get('id'))));
  }

  deleteContact(otherId: string): void {
    this.ngRedux.dispatch(deleteContactAction(this.ngRedux.getState().currentUserState.currentUser.account.id, otherId));
  }
}
