import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {SpecialistService} from "../../services/specialist.service";
import {Account} from "../../model/Account";
import {SearchObject} from "../../model/SearchObject";
import {Resume} from "../../model/Resume";
import {selectResumes, isLoading} from "../../store/selectors/resume.selector";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store/index";
import {skipWhile, take} from "rxjs/internal/operators";
import {
  fetchResumesAction, fetchResumesSpecialistsAction,
  searchResumesAction
} from "../../store/actions/resume.actions";

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {



  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  resumeList: Observable<Resume[]>;


  constructor(private ngRedux: NgRedux<AppState>, private specialisService: SpecialistService ) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(searchResumesAction(this.ngRedux.getState().specialistsSearchState.searchObj)));
  }

  onClick(account: Account) {
    this.specialisService.post(account as Account).subscribe(
      value => {
        console.log('[POST] create Fav successfully', value);
      }, error => {
        console.log('FAIL to create');
      },
      () => {
        console.log('POST Fav - now completed.');
      });
    ;
  }

}
