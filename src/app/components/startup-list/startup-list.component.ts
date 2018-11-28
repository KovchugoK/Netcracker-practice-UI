import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Startup} from '../../model/Startup';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {fetchStartupsAction, searchStartupsAction} from '../../store/actions/startups.actions';
import {selectStartups, isLoading} from '../../store/selectors/startups.selector';
import {skipWhile, take} from 'rxjs/internal/operators';
import {SortStartupType} from '../../model/SortStartupType';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-startup-list',
  templateUrl: './startup-list.component.html',
  styleUrls: ['./startup-list.component.css']
})
export class StartupListComponent implements OnInit {

  constructor(private ngRedux: NgRedux<AppState>, private fb: FormBuilder) {
  }

  searchForm: FormGroup;
  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectStartups)
  startupList: Observable<Startup[]>;

  sortTypes: SortStartupType[] = [
    {value: 'startupName ASC', viewValue: 'Startup name (A-Z)'},
    {value: 'startupName DESC', viewValue: 'Startup name (Z-A)'},
    {value: 'sumOfInvestment ASC', viewValue: 'Sum of investments (ascending)'},
    {value: 'sumOfInvestment DESC', viewValue: 'Sum of investments (descending)'},
    {value: 'dateOfCreation ASC', viewValue: 'Oldest'},
    {value: 'dateOfCreation DESC', viewValue: 'Newest'}
  ];

  // sortTypes: string[] = [
  //   'startupName(A-Z)',
  //   'startupName(Z-A)',
  //   'sumOfInvestments(asc)',
  //   'sumOfInvestments(des)',
  // ];

  ngOnInit() {

    this.initializeForm();

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchStartupsAction()));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectStartups));

  }

  private initializeForm() {
    this.searchForm = this.fb.group({
      startupName: [''],
      sortType: [this.sortTypes[0].value]
    });
  }

  private search() {
    this.ngRedux.dispatch(
      searchStartupsAction(this.searchForm.controls['startupName'].value, this.searchForm.controls['sortType'].value));
  }


}
