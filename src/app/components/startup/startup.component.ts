import {Component, OnInit} from '@angular/core';
import {Startup} from '../../model/Startup';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {
  isSelected,
  selectStartupFromState
} from '../../store/selectors/startups.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {selectStartup} from '../../store/actions/startup-state.actions';
import {showDialogAction} from '../../store/actions/dialogs.actions';
import {DeleteStartupComponent} from '../dialogs/delete-startup/delete-startup.component';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {User} from '../../model/User';
import {MakeInvestmentsComponent} from '../dialogs/make-investments/make-investments.component';
import {Investment} from '../../model/Investment';
import {skipWhile, take} from 'rxjs/internal/operators';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  id: string;

  @select(isSelected)
  isSelected: Observable<boolean>;

  @select(selectStartupFromState)
  startup: Observable<Startup>;

  @select(selectCurrentUser)
  currentUser: Observable<User>;

  investments: Investment[];
  currentInvestments: number;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectStartup(this.id));

    this.isSelected.pipe(skipWhile(result => result === true), take(1)).subscribe(() =>
      this.ngRedux.select(selectStartupFromState).subscribe(startup => {
          this.currentInvestments = startup.startupInvestments.map(value => value.sumOfInvestment).reduce((a, b) => a + b, 0);
          return this.investments =
            startup.startupInvestments.sort(
              (value1, value2) => value2.sumOfInvestment - value1.sumOfInvestment);

        }
      ));
  }

  deleteStartup() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteStartupComponent,
      width: '200px',
      data: {startupId: this.id}
    }));
  }

  makeInvestments() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: MakeInvestmentsComponent,
      width: '400px',
      data: {startupId: this.id}
    }));
  }

  // get currentUser(): boolean {
  //   if (this.ngRedux.getState().currentUserState.currentUser) {
  //     return true;
  //   }
  //   return false;
  // }

  // get currentUserAccountId(): string {
  //   return this.ngRedux.getState().currentUserState.currentUser.account.id;
  // }


}
