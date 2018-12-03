import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {showDialogAction} from '../store/actions/dialogs.actions';
import {SignInComponent} from '../components/dialogs/sign-in/sign-in.component';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store';
import {updateRouterState} from '../store/actions/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ngRedux: NgRedux<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.ngRedux.dispatch(updateRouterState('/main'));
    this.ngRedux.dispatch(showDialogAction({
      componentType: SignInComponent,
      width: '500px',
      data: null
    }));


    return false;
  }
}


