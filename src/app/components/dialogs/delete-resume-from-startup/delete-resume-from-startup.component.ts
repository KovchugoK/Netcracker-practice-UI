import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {AppState} from '../../../store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {deleteResumeFromStartupAction} from '../../../store/actions/startup-state.actions';
import {updateStartupAction} from '../../../store/actions/startups.actions';
import {ResumeDialogData} from '../../../model/dialog-data';

@Component({
  selector: 'app-delete-resume-from-startup',
  templateUrl: './delete-resume-from-startup.component.html',
  styleUrls: ['./delete-resume-from-startup.component.css']
})
export class DeleteResumeFromStartupComponent implements OnInit {

  accountId: string;
  startupResumeId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<DeleteResumeFromStartupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ResumeDialogData) {
  }

  ngOnInit() {
    this.startupResumeId = this.data.resumeId;
    this.accountId = this.ngRedux.getState().currentUserState.currentUser.account.id;
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  deleteResumeFromStartup() {
    this.ngRedux.dispatch(deleteResumeFromStartupAction(this.startupResumeId, this.accountId));
    this.ngRedux.dispatch(updateStartupAction(this.ngRedux.getState().startupPageState.startupModel));
    this.dialogRef.close(DialogResult.CLOSE);
  }
}

