import {Component, OnInit} from '@angular/core';
import {ResumeService} from "../../services/resume.service";
import {ActivatedRoute} from "@angular/router";
import {defaultResume, Resume} from "../../model/Resume";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from '@angular/common';


@Component({
  selector: 'app-resume-edit',
  templateUrl: './resume-edit.component.html',
  styleUrls: ['./resume-edit.component.css']
})
export class ResumeEditComponent implements OnInit {

  resume: Resume;
  resumeForm: FormGroup;
  id: string;

  skillsList: string[] = ['Java', 'Python', 'C', 'SQL', 'TypeScript', 'JavaScript', 'Angular',
    'Spring', 'HTML', 'CSS', 'Paint', 'JUnit'];

  rolesList: string[] = ['Developer', 'Designer', 'TE'];

  constructor(private resumeService: ResumeService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.reloadDate();
  }

  reloadDate() {
    if (this.id !== null) {
      this.resumeService.getResumeById(this.id).subscribe(resume => {
        this.resume = resume;
        this.initializeForm(resume);
        console.log(resume);
      });
    } else {
      this.resume = defaultResume;
      this.initializeForm(defaultResume);
    }
  }


  private initializeForm(resume: Resume) {
    this.resumeForm = this.fb.group({
      info: [resume.info],
      resumeSkills: [resume.resumeSkills],
      businessRole: [resume.businessRole],
    })
    ;
  }

  get info(): FormControl {
    return this.resumeForm.get('info') as FormControl;
  }

  get resumeSkills(): FormControl {
    return this.resumeForm.get('resumeSkills') as FormControl;
  }

  get businessRole(): FormControl {
    return this.resumeForm.get('businessRole') as FormControl;
  }


  goBack(): void {
    this.location.back();
  }

  updateResume() {
    this.resumeService.updateResume(this.id, this.resumeForm.value as Resume).subscribe(() => this.goBack());
  }

  createResume() {
    this.resumeService.createResume(this.resumeForm.value as Resume).subscribe(() => this.location.go('resume/list'));
  }


}
