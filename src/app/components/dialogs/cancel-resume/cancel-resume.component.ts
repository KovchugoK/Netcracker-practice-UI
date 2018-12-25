import {Component, Inject, OnInit} from '@angular/core';
import {AppState} from '../../../store';
import {DialogResult} from '../../../model/dialog-result';
import {NgRedux} from '@angular-redux/store';
import {ResumeDialogData} from '../../../model/dialog-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {cancelResumeToStartupAction} from '../../../store/actions/startup-state.actions';

@Component({
  selector: 'app-cancel-resume',
  templateUrl: './cancel-resume.component.html',
  styleUrls: ['./cancel-resume.component.css']
})
export class CancelResumeComponent implements OnInit {

  startupResumeId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<CancelResumeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ResumeDialogData) {
  }

  ngOnInit() {
    this.startupResumeId = this.data.resumeId;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {

      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  cancelResume() {
    this.ngRedux.dispatch(cancelResumeToStartupAction(this.startupResumeId));
    this.dialogRef.close(DialogResult.CLOSE);
  }
}


