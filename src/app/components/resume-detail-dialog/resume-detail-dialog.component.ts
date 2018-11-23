import {Component, Inject} from '@angular/core';
import {Resume} from '../../model/Resume';
import {MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail-dialog.component.html',
  styleUrls: ['./resume-detail-dialog.component.css']
})
export class ResumeDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { resume: Resume }
  ) {
  }

  private formatDate(dateString: string): string {
    moment.locale('ru');
    return moment(dateString).format('L');
  }
}
