import {Component, Inject, OnInit} from '@angular/core';
import {ResumeDialogData} from '../../../model/dialog-data';
import {DeleteStartupComponent} from '../delete-startup/delete-startup.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppState} from '../../../store';
import {NgRedux} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {StartupResumeService} from '../../../services/startup-resume.service';
import {rejectResumeAction} from '../../../store/actions/startup-state.actions';

@Component({
  selector: 'app-reject-resume',
  templateUrl: './reject-resume.component.html',
  styleUrls: ['./reject-resume.component.css']
})
export class RejectResumeComponent implements OnInit {

  resumeId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupResumeService: StartupResumeService,
              public dialogRef: MatDialogRef<DeleteStartupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ResumeDialogData) {
  }

  ngOnInit() {
    this.resumeId = this.data.resumeId;

  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  rejectResume() {
    this.ngRedux.dispatch(rejectResumeAction(this.resumeId));
  }

}
