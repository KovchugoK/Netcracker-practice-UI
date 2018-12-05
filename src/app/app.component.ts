import {Component, OnInit} from '@angular/core';
import {User} from './model/User';
import {Observable} from 'rxjs';
import {NgRedux, select} from '@angular-redux/store';
import {selectCurrentUser} from './store/selectors/current-user.selector';
import {AppState} from './store';
import {GlobalUserStorageService} from './services/global-storage.service';
import {updateCurrentUserAction} from './store/actions/current-user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @select(selectCurrentUser)
  currentUser: Observable<User>;

  constructor(private ngRedux: NgRedux<AppState>, private localStorageService: GlobalUserStorageService) {
  }

  ngOnInit() {
    this.localStorageService.asObservable().subscribe((user: Event) => {
      this.ngRedux.dispatch(updateCurrentUserAction(this.localStorageService.currentUser));
    });
  }
}
