import {Component, OnInit, Inject} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AppState} from 'src/app/store';
import {StartupDialogData} from '../../../model/dialog-data';
import {DialogResult} from '../../../model/dialog-result';
import {deleteStartupAction} from '../../../store/actions/startups.actions';
import {updateRouterState} from '../../../store/actions/router.actions';

@Component({
  selector: 'app-startup-user',
  templateUrl: './delete-startup.component.html',
  styleUrls: ['./delete-startup.component.css']
})
export class DeleteStartupComponent implements OnInit {

  startupId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<DeleteStartupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StartupDialogData) {
  }

  ngOnInit() {
    this.startupId = this.data.startupId;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {

      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  delete() {
    this.ngRedux.dispatch(deleteStartupAction(this.startupId));
    this.ngRedux.dispatch(updateRouterState('/startup-list'));
    this.dialogRef.close(DialogResult.CLOSE);
  }
}
