import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../../store/index";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ResumeDialogData} from "../../../model/dialog-data";
import {DialogResult} from "../../../model/dialog-result";
import {deleteResumeAction} from "../../../store/actions/resume.actions";
import {updateRouterState} from "../../../store/actions/router.actions";

@Component({
  selector: 'app-delete-resume',
  templateUrl: './delete-resume.component.html',
  styleUrls: ['./delete-resume.component.css']
})
export class DeleteResumeComponent implements OnInit {

  resumeId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<DeleteResumeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ResumeDialogData) { }

  ngOnInit() {
    this.resumeId = this.data.resumeId;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {
        this.ngRedux.dispatch(deleteResumeAction(this.resumeId));
        this.ngRedux.dispatch(updateRouterState('/resume/list'));
      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

}
