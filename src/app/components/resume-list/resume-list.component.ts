import {Component, OnInit} from '@angular/core';
import {Resume} from '../../model/Resume';
import {ResumeService} from '../../services/resume.service';
import {MatDialog} from '@angular/material';
import {ResumeDetailComponent} from '../resume-detail/resume-detail.component';

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

  openDialog(resume: Resume) {
    this.dialog.open(ResumeDetailComponent, {
      width: 'auto',
      height: 'auto',
      data: {resume: resume}
    });
  }
}
