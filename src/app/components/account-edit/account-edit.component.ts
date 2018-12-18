import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {updateRouterState} from '../../store/actions/router.actions';
import {skipWhile, take} from 'rxjs/internal/operators';
import {updateStartupAction} from '../../store/actions/startups.actions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store';
import {Subscription} from 'rxjs/internal/Subscription';
import {Account, defaultAccount} from '../../model/Account';
import {WorkExperience} from '../../model/WorkExperience';
import {DetailAccountDTO} from '../../model/DetailAccountDTO';
import {Resume} from '../../model/Resume';
import {Startup} from '../../model/Startup';
import {Education} from '../../model/Education';
import {User} from '../../model/User';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  account: Account;
  accountId: string;
  accountForm: FormGroup;

  workExperience: FormArray;
  education: FormArray;

  subscription: Subscription;
  base64textString: string;

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private ngRedux: NgRedux<AppState>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id');
    this.account = defaultAccount;
    console.log(this.accountId);
    this.account.id = this.accountId;

    this.accountForm = this.formBuilder.group({
        firstName: [this.account.firstName, [Validators.required, Validators.maxLength(35)], Validators.pattern(/^[A-z0-9]*$/)],
        lastName: [this.account.lastName, [Validators.maxLength(35), Validators.pattern(/^[A-z0-9]*$/)]],
        birthday: [this.account.birthday],
        aboutMe: [this.account.aboutMe],
        workExperience: this.formBuilder.array([this.createWorkExperienceItem()], Validators.maxLength(10)),
        education: this.formBuilder.array([this.createEducationItem()], Validators.maxLength(10))
      }
    );
    this.getWorkExperienceAsFormGroup();
    this.onChanges();
  }

  onChanges() {
    this.subscription = this.accountForm.valueChanges.subscribe(
      value => {
        this.account.firstName = value.firstName;
        this.account.lastName = value.lastName;
        this.account.birthday = value.birthday;
        this.account.aboutMe = value.aboutMe;
        this.account.workExperiences = value.workExperience;
        this.account.educations = value.education;
      }
    );
  }

  getWorkExperienceAsFormGroup() {
    if (this.account.workExperiences != null) this.account.workExperiences.forEach(value => {
      this.workExperience.push(this.formBuilder.group({
        workPlace: value.workPlace,
        position: value.position,
        start: value.start,
        finish: value.finish
      }));
    });
  }

  createWorkExperienceItem(): FormGroup {
    return this.formBuilder.group({
      workPlace: '',
      position: '',
      start: new Date(),
      finish: new Date()
    }, {validator: this.dateLessThan('start', 'finish')});
  }

  createEducationItem(): FormGroup {
    return this.formBuilder.group({
      institution: '',
      completionYear: ['', Validators.pattern('\\d{4,4}')]
    });
  }

  onSubmit(form) {
    console.log(form);
    let detailAccountDTO: DetailAccountDTO;
    detailAccountDTO = {
      id: this.account.id,
      firstName: this.account.firstName,
      lastName: this.account.lastName,
      birthday: this.account.birthday,
      user: this.account.user,
      aboutMe: this.account.aboutMe,
      resumes: this.account.resumes,
      startups: this.account.startups,
      startupRoles: this.account.startupRoles,
      favorites: this.account.favorites,
      educations: this.account.educations,
      workExperiences: this.account.workExperiences,
      imageId: this.account.imageId,
      compressedImageId: this.account.compressedImageId,
      image: this.base64textString
    };
    this.accountService.updateAccount(detailAccountDTO);
  }

  addWorkExperience(): void {
    this.workExperience = this.accountForm.get('workExperience') as FormArray;
    this.workExperience.push(this.createWorkExperienceItem());
  }

  deleteWorkExperience(id: number): void {
    this.workExperience = this.accountForm.get('workExperience') as FormArray;
    this.workExperience.removeAt(id);
  }

  addEducation(): void {
    this.education = this.accountForm.get('education') as FormArray;
    this.education.push(this.createEducationItem());
  }

  deleteEducation(id: number): void {
    this.education = this.accountForm.get('education') as FormArray;
    this.education.removeAt(id);
  }

  getImageAsString(base64textString: string) {
    this.base64textString = base64textString;
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value && t != null) {
        return {
          dates: 'Date from should be less than Date to'
        };
      }
      return {};
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
