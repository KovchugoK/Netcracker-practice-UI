import {Component, OnInit} from '@angular/core';
import {Resume} from '../../model/Resume';
import {ResumeService} from '../../services/resume.service';
import {MatDialog} from '@angular/material';
import {ResumeDetailDialogComponent} from '../resume-detail-dialog/resume-detail-dialog.component';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {
  resumes: Resume[];

  constructor(
    private resumeService: ResumeService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getResumes();
  }

  getResumes(): void {
    this.resumeService
      .gerResumeList()
      .subscribe(resumes => this.resumes = resumes);
  }

}
