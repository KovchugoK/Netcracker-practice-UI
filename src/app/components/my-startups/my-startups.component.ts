import {Component, OnInit} from '@angular/core';
import {isLoading, selectStartups} from '../../store/selectors/startups.selector';
import {skipWhile, take} from 'rxjs/internal/operators';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {fetchMyStartupsAction} from '../../store/actions/startups.actions';
import {Startup} from '../../model/Startup';
import {AppState} from '../../store';

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

  @select(selectStartups)
  startupList: Observable<Startup[]>;

  ngOnInit() {

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchMyStartupsAction(this.ngRedux.getState().userState.currentUser.account.id)));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectStartups));
  }


}
