import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {acceptResumeToStartupAction} from '../../../store/actions/startup-state.actions';
import {AppState} from '../../../store';
import {DeleteStartupComponent} from '../delete-startup/delete-startup.component';
import {NgRedux} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {StartupResumeService} from '../../../services/startup-resume.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-accept-resume',
  templateUrl: './accept-resume.component.html',
  styleUrls: ['./accept-resume.component.css']
})
export class AcceptResumeComponent implements OnInit {

  resumeId: string;
  accountId: string;
  acceptResumeForm: FormGroup;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupResumeService: StartupResumeService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeleteStartupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.resumeId = this.data.resumeId;
    this.accountId = this.data.accountId;
    this.initializeForm();
  }

  private initializeForm() {
    this.acceptResumeForm = this.fb.group({
      role: ['', Validators.required]
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }


  acceptResume() {
    this.ngRedux.dispatch(acceptResumeToStartupAction(this.resumeId, this.acceptResumeForm.controls['role'].value, this.accountId));
    // this.startupResumeService.acceptResume(this.resumeId, this.acceptResumeForm.controls['role'].value)
    //   .subscribe(() => this.ngRedux.dispatch(selectStartup(this.ngRedux.getState().startupPageState.startupModel.id)));
  }
}
