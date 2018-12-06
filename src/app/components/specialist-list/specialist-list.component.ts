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
import {fetchResumesAction, fetchResumesSpecialistsAction} from "../../store/actions/resume.actions";

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {

  /*resumeList: Observable<Resume[]>;

  constructor(private specialisService: SpecialistService) {
  }

  ngOnInit() {
    this.reloadData();
  }



  reloadData(searchObj: SearchObject = null) {
    this.resumeList = this.specialisService.getSpecialistList(searchObj);
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
  }*/

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  resumeList: Observable<Resume[]>;


  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchResumesSpecialistsAction(null)));
  }

  selectSearchObj(searchObj: SearchObject) {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchResumesSpecialistsAction(searchObj)));
  }

}
