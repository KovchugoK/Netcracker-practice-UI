import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {kickMemberFromStartupAction} from '../../../store/actions/startup-state.actions';
import {AppState} from '../../../store';
import {NgRedux} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';


@Component({
  selector: 'app-kick-member',
  templateUrl: './kick-member.component.html',
  styleUrls: ['./kick-member.component.css']
})
export class KickMemberComponent implements OnInit {

  resumeId: string;
  accountId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<KickMemberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.resumeId = this.data.resumeId;
    this.accountId = this.data.accountId;
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }


  kickMember() {
    this.ngRedux.dispatch(kickMemberFromStartupAction(this.resumeId, this.accountId));
  }

}
