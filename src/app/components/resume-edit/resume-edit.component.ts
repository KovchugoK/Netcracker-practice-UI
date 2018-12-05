import {Component, OnInit} from '@angular/core';
import {ResumeService} from "../../services/resume.service";
import {ActivatedRoute} from "@angular/router";
import {defaultResume, Resume} from "../../model/Resume";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Location} from '@angular/common';
import {Skill} from "../../model/Skill";
import {BusinessRole} from "../../model/BusinessRole";
import {ResumeSkill} from "../../model/ResumeSkill";
import {Observable} from "rxjs/index";
import {NgRedux, select} from "@angular-redux/store";
import {isLoading, isSelected, selectResumeForEdit, selectResumes} from '../../store/selectors/resume.selector';
import {selectResume} from "../../store/actions/resume-state.actions";
import {skipWhile, take} from "rxjs/internal/operators";
import {AppState} from "../../store/index";
import {createResumeAction} from "../../store/actions/resume.actions";
import {updateRouterState} from "../../store/actions/router.actions";


@Component({
  selector: 'app-resume-edit',
  templateUrl: './resume-edit.component.html',
  styleUrls: ['./resume-edit.component.css']
})
export class ResumeEditComponent implements OnInit {

  resume: Resume;
  resumeForm: FormGroup;

  skillsList: Skill[];
  rolesList: BusinessRole[];

  id: string;

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(isSelected)
  isSelected: Observable<boolean>;


  constructor(private ngRedux: NgRedux<AppState>,
              private resumeService: ResumeService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.resumeService.getAllSkills().subscribe(skillsList => this.skillsList = skillsList);
    this.resumeService.getAllBusinessRole().subscribe(businessRole => this.rolesList = businessRole);
    this.ngRedux.dispatch(selectResume(this.id));
    this.isSelected.pipe(skipWhile(result => result), take(1))
      .subscribe(() => this.ngRedux.select(state => selectResumeForEdit(state))
        .subscribe(resume => {
          this.initializeForm(resume);
        }));
  }


  private initializeForm(resume: Resume) {
    this.resumeForm = this.fb.group({
      info: [resume.info],
      resumeSkills: [resume.resumeSkills],
      account: [this.ngRedux.getState().userState.currentUser.account],
      businessRole: [resume.businessRole],
    })
    ;
  }

  get info(): FormControl {
    return this.resumeForm.get('info') as FormControl;
  }

 /* get resumeSkills(): FormControl {
    console.log(this.resumeForm.get('resumeSkills'));
    return this.resumeForm.get('resumeSkills') as FormControl;
  }*/

  get businessRole(): FormControl {
    return this.resumeForm.get('businessRole') as FormControl;
  }

  getAccount(): Account {
    return this.resumeForm.get('account').value as Account;
  }

  goBack(): void {
    this.location.back();
  }

  /* onDeleteSkill(skill: Skill) {
     this.resumeService.deleteResumeSkill(this.id, skill).subscribe(() => this.reloadDate());
   }*/

  updateResume() {
    console.log(this.resumeForm.value.resumeSkills);
    this.resumeService.updateResume(this.id, this.resumeForm.value as Resume).subscribe(() => this.goBack());
  }

  /* createResume() {
     this.resumeService.createResume(this.resumeForm.value as Resume).subscribe(() => this.location.go('/resume/list'));
   }*/

  createResume() {
    this.ngRedux.dispatch(createResumeAction({...this.resumeForm.value, id: this.id}));
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(updateRouterState('/resume/list')));
  }


}
