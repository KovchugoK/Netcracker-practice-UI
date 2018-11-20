import {Component, OnInit} from '@angular/core';
import {Startup} from '../../model/Startup';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {NgRedux, select} from '@angular-redux/store';
import {
  isLoading,
  isSelected,
  selectStartupById,
  selectStartupForEdit,
  selectStartupFromState
} from '../../store/selectors/startups.selector';
import {Observable} from 'rxjs';
import {skipWhile, take} from 'rxjs/internal/operators';
import {AppState} from '../../store';
import {createStartupAction, deleteStartupAction, fetchStartupsAction} from '../../store/actions/startups.actions';
import {selectStartup} from '../../store/actions/startup-state.actions';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  id: string;

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(isSelected)
  isSelected: Observable<boolean>;

  @select(selectStartupFromState)
  startup: Observable<Startup>;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              private route: ActivatedRoute,
              ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.ngRedux.dispatch(selectStartup(this.id));
    // this.isSelected.pipe(skipWhile(result => result === true), take(1))
    //   .subscribe(() => this.ngRedux.select(state => selectStartupFromState(state)));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(selectStartup(this.id))
      );
    this.isSelected.pipe(skipWhile(result => result), take(1))
      .subscribe(() => this.ngRedux.select(state => selectStartupFromState(state)));

  }

  deleteStartup() {
    // this.isLoading.pipe(skipWhile(result => result === true), take(1))
    //   .subscribe(() => this.ngRedux.dispatch(deleteStartupAction(this.id)));
    this.ngRedux.dispatch(deleteStartupAction(this.id));
    // this.router.navigate(['/startup-list']);
    // this.location.back();
    // this.isLoading.pipe(skipWhile(result => result === true), take(1))
    //   .subscribe(() => this.location.back());
    //   this.isLoading.pipe(skipWhile(result => result), take(1)).subscribe(() => this.location.go('/startup-list'));
  }

  get currentUser(): boolean {
    if (this.ngRedux.getState().userState.currentUser) {
      return true;
    }
    return false;
  }

  get currentUserAccountId(): string {
    return this.ngRedux.getState().userState.currentUser.account.id;
  }


}
