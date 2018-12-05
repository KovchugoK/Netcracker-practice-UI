import {Component, OnInit} from '@angular/core';
import {Resume} from '../../model/Resume';
import {selectResumes, isLoading} from "../../store/selectors/resume.selector";
import {NgRedux, select} from "@angular-redux/store";
import {Observable} from "rxjs/index";
import {AppState} from "../../store/index";
import {fetchResumesAction} from "../../store/actions/resume.actions";
import {skipWhile, take} from "rxjs/internal/operators";

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  resumeList: Observable<Resume[]>;


  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchResumesAction()));

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.select(selectResumes));
  }


}
