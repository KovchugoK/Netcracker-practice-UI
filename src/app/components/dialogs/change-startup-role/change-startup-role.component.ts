import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppState} from '../../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgRedux} from '@angular-redux/store';
import {StartupResumeService} from '../../../services/startup-resume.service';
import {DialogResult} from '../../../model/dialog-result';
import {DeleteStartupComponent} from '../delete-startup/delete-startup.component';
import {acceptResumeToStartupAction, changeStartupMemberRoleAction} from '../../../store/actions/startup-state.actions';

@Component({
  selector: 'app-change-startup-role',
  templateUrl: './change-startup-role.component.html',
  styleUrls: ['./change-startup-role.component.css']
})
export class ChangeStartupRoleComponent implements OnInit {

  accountId: string;
  changeStartupRoleForm: FormGroup;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupResumeService: StartupResumeService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeleteStartupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.accountId = this.data.accountId;
    this.initializeForm();
  }
  private initializeForm() {
    this.changeStartupRoleForm = this.fb.group({
      role: ['', Validators.required]
    });
  }
  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  changeStartupMemberRole() {
    this.ngRedux.dispatch(changeStartupMemberRoleAction(this.changeStartupRoleForm.controls['role'].value, this.accountId));
  }
}
