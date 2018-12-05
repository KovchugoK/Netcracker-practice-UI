import {Component, OnInit} from '@angular/core';
import {SortStartupType} from '../../model/SortStartupType';
import {NgRedux} from '@angular-redux/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppState} from '../../store';
import {updateStartupSearchToolbarAction} from '../../store/actions/startup-search-toolbar.actions';
import {searchStartupsAction} from '../../store/actions/startups.actions';
import {selectStartupSearchParams} from '../../store/selectors/startup-search-toolbar.selector';
import {StartupSearchParams} from '../../store/reducers/startup-search-toolbar.reducer';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-startup-search-toolbar',
  templateUrl: './startup-search-toolbar.component.html',
  styleUrls: ['./startup-search-toolbar.component.css']
})
export class StartupSearchToolbarComponent implements OnInit {
  searchForm: FormGroup;
  creatorSearchView = true;
  sortTypes: SortStartupType[] = [
    {value: {sortBy: 'startupName', sortDirection: 'ASC'}, viewValue: 'Startup name (A-Z)'},
    {value: {sortBy: 'startupName', sortDirection: 'DESC'}, viewValue: 'Startup name (Z-A)'},
    {value: {sortBy: 'sumOfInvestment', sortDirection: 'ASC'}, viewValue: 'Sum of investments (ascending)'},
    {value: {sortBy: 'sumOfInvestment', sortDirection: 'DESC'}, viewValue: 'Sum of investments (descending)'},
    {value: {sortBy: 'dateOfCreation', sortDirection: 'ASC'}, viewValue: 'Oldest'},
    {value: {sortBy: 'dateOfCreation', sortDirection: 'DESC'}, viewValue: 'Newest'}
  ];


  constructor(private ngRedux: NgRedux<AppState>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.ngRedux.select(selectStartupSearchParams).pipe(map(value => this.transformStartupSearchParams(value))).subscribe(startipSearchParams =>
      this.initializeForm(startipSearchParams));
    // this.ngRedux.dispatch(updateStartupSearchToolbarAction(this.searchForm.value));
  }

  private initializeForm(startupSearchParams: StartupSearchParams) {
    this.searchForm = this.fb.group({
      startupNameContains: [startupSearchParams.startupNameContains],
      creatorNameContains: [startupSearchParams.creatorNameContains],
      sortType: [this.sortTypes[this.sortTypes.findIndex(value => value.viewValue === startupSearchParams.sortType.viewValue)]]
    });

  }

  private search() {
    if (this.ngRedux.getState().router === '/my-startups') {
      this.ngRedux.dispatch(searchStartupsAction({...this.searchForm.value,
        accountID: this.ngRedux.getState().currentUserState.currentUser.account.id}));
      this.ngRedux.dispatch(updateStartupSearchToolbarAction({...this.searchForm.value,
        creatorNameContains: '',
        accountID: ''}));
    } else {
      this.ngRedux.dispatch(searchStartupsAction({...this.searchForm.value, accountID: ''}));
      this.ngRedux.dispatch(updateStartupSearchToolbarAction({...this.searchForm.value, accountID: ''}));
    }
  }

  private transformStartupSearchParams(startupSearchParams: StartupSearchParams) {
    if (this.ngRedux.getState().router === '/my-startups') {
      this.creatorSearchView = false;
      return {...startupSearchParams, creatorNameContains: this.ngRedux.getState().currentUserState.currentUser.login};
    }
    this.creatorSearchView = true;
    return startupSearchParams;
  }
}
