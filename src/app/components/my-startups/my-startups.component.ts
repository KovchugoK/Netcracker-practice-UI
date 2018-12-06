import {Component, OnInit} from '@angular/core';
import {isLoading, selectMyStartupsAsLeader, selectMyStartupsAsMember, selectStartups} from '../../store/selectors/startups.selector';
import {skipWhile, take} from 'rxjs/internal/operators';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {Startup} from '../../model/Startup';
import {AppState} from '../../store';
import {searchStartupsAction} from '../../store/actions/startups.actions';

@Component({
  selector: 'app-my-startups',
  templateUrl: './my-startups.component.html',
  styleUrls: ['./my-startups.component.css']
})
export class MyStartupsComponent implements OnInit {


  constructor(private ngRedux: NgRedux<AppState>) {
  }

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectMyStartupsAsLeader)
  startupListLeader: Observable<Startup[]>;

  @select(selectMyStartupsAsMember)
  startupListMember: Observable<Startup[]>;

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(searchStartupsAction(
        {
          ...this.ngRedux.getState().startupSearchToolbarState.startupSearchParams,
          accountID: this.ngRedux.getState().currentUserState.currentUser.account.id,
          creatorNameContains: this.ngRedux.getState().currentUserState.currentUser.login
        })));
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectStartups));
  }

}
