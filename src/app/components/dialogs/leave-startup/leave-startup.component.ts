import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {AppState} from '../../../store';
import {leaveStartupAction} from '../../../store/actions/startup-state.actions';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {updateStartupAction} from '../../../store/actions/startups.actions';

@Component({
  selector: 'app-leave-startup',
  templateUrl: './leave-startup.component.html',
  styleUrls: ['./leave-startup.component.css']
})
export class LeaveStartupComponent implements OnInit {

  accountId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<LeaveStartupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.accountId = this.data.accountId;
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  leaveStartup() {
    this.ngRedux.dispatch(leaveStartupAction(this.accountId));
    this.ngRedux.dispatch(updateStartupAction(this.ngRedux.getState().startupPageState.startupModel));
    this.dialogRef.close(DialogResult.CLOSE);
  }
}
