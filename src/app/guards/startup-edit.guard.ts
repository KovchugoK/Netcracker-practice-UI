import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store';
import {updateRouterState} from '../store/actions/router.actions';
import {StartupService} from '../services/startup.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StartupEditGuard implements CanActivate {
  constructor(private ngRedux: NgRedux<AppState>, private startupService: StartupService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const accountId = this.ngRedux.getState().currentUserState.currentUser !== null ?
      this.ngRedux.getState().currentUserState.currentUser.account.id : '';
    return this.startupService.checkPermissionToEdit
    (accountId, route.paramMap.get('id'))
      .pipe(
        map(e => {
          if (e) {
            return true;
          } else {
            this.ngRedux.dispatch(updateRouterState('/main-page'));
            return false;
          }
        }),
        catchError(() => {
          this.ngRedux.dispatch(updateRouterState('/main-page'));
          return of(false);
        })
      );
  }
}
