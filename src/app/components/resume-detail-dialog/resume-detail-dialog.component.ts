import {Component, Inject, OnInit} from '@angular/core';
import {ResumeService} from '../../services/resume.service';
import {Resume} from '../../model/Resume';
import {Account} from '../../model/Account'
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/index';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store/index';
import {selectResumeFromState, isSelected} from '../../store/selectors/resume.selector';
import {selectResume} from '../../store/actions/resume-state.actions';
import {DeleteResumeComponent} from '../dialogs/delete-resume/delete-resume.component';
import {showDialogAction} from '../../store/actions/dialogs.actions';


@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail-dialog.component.html',
  styleUrls: ['./resume-detail-dialog.component.css']
})
export class ResumeDetailDialogComponent implements OnInit {


  id: string;

  @select(isSelected)
  isSelected: Observable<boolean>;

  @select(selectResumeFromState)
  resume: Observable<Resume>;

  constructor(private ngRedux: NgRedux<AppState>,
              private reumeService: ResumeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectResume(this.id));
  }


  onDeleteResume() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteResumeComponent,
      width: '200px',
      data: {resumeId: this.id}
    }));
  }


  get currentUser(): boolean {
    if (this.ngRedux.getState().currentUserState.currentUser) {
      return true;
    }
    return false;
  }

  get currentUserAccountId(): string {
    return this.ngRedux.getState().currentUserState.currentUser.account.id;
  }

  get currentAccount(): Account{
    return this.ngRedux.getState().currentUserState.currentUser.account;
  }


}
