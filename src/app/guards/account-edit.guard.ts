import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../store';
import {updateRouterState} from '../store/actions/router.actions';
import {User} from '../model/User';
import {Observable} from 'rxjs/index';
import {selectCurrentUser} from '../store/selectors/current-user.selector';

@Injectable({
  providedIn: 'root'
})
export class AccountEditGuard implements CanActivate {
  @select(selectCurrentUser)
  user: Observable<User>;
  currentUser: User;
  constructor(private ngRedux: NgRedux<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user.subscribe(value => this.currentUser = value);
    if ((route.paramMap.get('id') === this.currentUser.account.id)) {
      return true;
    }
    this.ngRedux.dispatch(updateRouterState('/account/' + route.paramMap.get('id')));

    return false;
  }
}


