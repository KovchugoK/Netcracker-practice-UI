import {Component, OnInit} from '@angular/core';
import {SignInComponent} from '../dialogs/sign-in/sign-in.component';
import {SignUpComponent} from '../dialogs/sign-up/sign-up.component';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {showDialogAction} from '../../store/actions/dialogs.actions';
import {logoutUserAction} from '../../store/actions/current-user.actions';
import {Observable} from 'rxjs';
import {User} from '../../model/User';

import {updateRouterState} from '../../store/actions/router.actions';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {hideUserSideNavAction} from '../../store/actions/user-side-nav.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ls = localStorage;

  @select(selectCurrentUser)
  currentUser: Observable<User>;

  navLinks = [{
    path: '/main-page',
    label: 'Main',
    isActive: true
  }, {
    path: '/startup-list',
    label: 'Startups',
    isActive: true
  },
    {
      path: '/specialist-list',
      label: 'Specialists',
      isActive: true
    },
    {
      path: '/investor-list',
      label: 'Investors',
      isActive: true
    }];

  constructor(
    private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
  }

  openSingIn(): void {
    this.ngRedux.dispatch(showDialogAction({
      componentType: SignInComponent,
      width: '500px',
      data: null
    }));

  }

  openSingUp(): void {
    this.ngRedux.dispatch(showDialogAction({
      componentType: SignUpComponent,
      width: '500px',
      data: null
    }));
  }

  logout() {
    this.ls.clear();
    this.ngRedux.dispatch(hideUserSideNavAction());
    this.ngRedux.dispatch(logoutUserAction());
    this.ngRedux.dispatch(updateRouterState('/main'));
  }

}
