import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {Resume} from "../../model/Resume";
import {selectResumes, isLoading} from "../../store/selectors/resume.selector";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store/index";
import {skipWhile, take} from "rxjs/internal/operators";
import {
  fetchResumesInvestorstsAction
} from "../../store/actions/resume.actions";

@Component({
  selector: 'app-investor-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  resumeList: Observable<Resume[]>;

  constructor(private ngRedux: NgRedux<AppState>) {

  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchResumesInvestorstsAction()));
  }

}

