import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Startup} from '../../model/Startup';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {fetchStartupsAction} from '../../store/actions/startups.actions';
import {selectStartups, isLoading} from '../../store/selectors/startups.selector';
import {skipWhile, take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-startup-list',
  templateUrl: './startup-list.component.html',
  styleUrls: ['./startup-list.component.css']
})
export class StartupListComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectStartups)
  startupList: Observable<Startup[]>;

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchStartupsAction()));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectStartups));
  }


}
