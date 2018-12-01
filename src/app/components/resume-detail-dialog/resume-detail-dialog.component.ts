import {Component, Inject, OnInit} from '@angular/core';
import {ResumeService} from "../../services/resume.service";
import {Resume} from "../../model/Resume";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail-dialog.component.html',
  styleUrls: ['./resume-detail-dialog.component.css']
})
export class ResumeDetailDialogComponent implements OnInit {
  resume: Resume;

  constructor(private resumeService: ResumeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.reloadDate();
  }

  reloadDate() {
    const id = this.route.snapshot.paramMap.get('id');
    this.resumeService.getResumeById(id).subscribe(resume => this.resume = resume);
    console.log(this.resume);
  }
}
