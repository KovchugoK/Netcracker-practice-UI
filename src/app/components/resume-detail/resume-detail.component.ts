import {Component, Inject} from '@angular/core';
import {Resume} from '../../model/Resume';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail.component.html',
  styleUrls: ['./resume-detail.component.css']
})
export class ResumeDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { resume: Resume },
  ) {
  }
}
