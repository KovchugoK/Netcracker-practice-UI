import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {searchContactsAction} from '../../store/actions/contacts.actions';
import {ActivatedRoute} from '@angular/router';
import {selectContactsSearchParams} from '../../store/selectors/contacts-search-toolbar.selector';
import {Observable} from 'rxjs';
import {updateContactsSearchParamsAction} from '../../store/actions/contacts-search-toolbar.actions';

@Component({
  selector: 'app-contacts-search-toolbar',
  templateUrl: './contacts-search-toolbar.component.html',
  styleUrls: ['./contacts-search-toolbar.component.css']
})
export class ContactsSearchToolbarComponent implements OnInit {

  @select(selectContactsSearchParams)
  searchParams: Observable<string>;

  constructor(private ngRedux: NgRedux<AppState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  search(name: string) {
    this.ngRedux.dispatch(searchContactsAction(this.route.snapshot.paramMap.get('id'), name.trim()));
    this.ngRedux.dispatch(updateContactsSearchParamsAction(name.trim()));
  }
}
