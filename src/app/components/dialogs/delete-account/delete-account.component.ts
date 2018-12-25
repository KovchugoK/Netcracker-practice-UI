import {Component, Inject, OnInit} from '@angular/core';
import {DialogResult} from "../../../model/dialog-result";
import {DeleteStartupComponent} from "../delete-startup/delete-startup.component";
import {NgRedux} from "@angular-redux/store";
import {updateRouterState} from "../../../store/actions/router.actions";
import {AppState} from "../../../store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {deleteStartupAction} from "../../../store/actions/startups.actions";
import {AccountDialogData, StartupDialogData} from "../../../model/dialog-data";
import {deleteAccountAction} from "../../../store/actions/accounts.actions";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  accountId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<DeleteAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AccountDialogData) {
  }

  ngOnInit() {
    this.accountId = this.data.accountId;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {

      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  delete() {
    this.ngRedux.dispatch(deleteAccountAction(this.accountId));
    this.ngRedux.dispatch(updateRouterState('/main-page'));
    this.dialogRef.close(DialogResult.CLOSE);
  }

}
