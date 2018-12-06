import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {NgRedux, select} from '@angular-redux/store';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {User} from '../../model/User';
import {isOpened} from '../../store/selectors/user-side-nav.selector';
import {hideUserSideNavAction, showUserSideNavAction} from '../../store/actions/user-side-nav.actions';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {

  // opened = false;
  @ViewChild('sidenav')
  nav: MatSidenav;


  @select(selectCurrentUser)
  currentUser: Observable<User>;

  @select(isOpened)
  opened: Observable<boolean>;

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
  }

  open() {
    this.nav.toggle();
    this.ngRedux.dispatch(showUserSideNavAction());
  }

  close() {
    this.nav.toggle();
    this.ngRedux.dispatch(hideUserSideNavAction());
  }
}
