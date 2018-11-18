import {Component, OnInit} from '@angular/core';
import {SignInComponent} from '../dialogs/sign-in/sign-in.component';
import {SignUpComponent} from '../dialogs/sign-up/sign-up.component';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {showDialogAction} from '../../store/actions/dialogs.actions';
import {clearCurrentUserSuccessAction} from '../../store/actions/user.actions';
import {Observable} from 'rxjs';
import {User} from '../../model/User';
import {currentUser} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ls = localStorage;
  @select(currentUser)
  currentUser: Observable<User>;

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

  get currentLogin(): string {
    return this.ngRedux.getState().userState.currentUser.login;
  }

  logout() {
    this.ls.clear();
    this.ngRedux.dispatch(clearCurrentUserSuccessAction());
  }

}
