import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {updateRouterState} from "../../store/actions/router.actions";
import {skipWhile, take} from "rxjs/internal/operators";
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store";
import {Subscription} from "rxjs/internal/Subscription";
import {Account} from "../../model/Account";
import {Observable} from "rxjs/index";
import {isLoading, isSelected, selectAccountForEdit} from "../../store/selectors/account.selector";
import {selectAccount} from "../../store/actions/account-state.actions";
import {updateAccountAction} from "../../store/actions/accounts.actions";


@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  accountId: string;
  accountForm: FormGroup;

  workExperience: FormArray;
  education: FormArray;

  subscription :Subscription;
  base64textString: string;

  updatedAccount: Account;

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(isSelected)
  isSelected: Observable<boolean>;

 constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private ngRedux: NgRedux<AppState>,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectAccount(this.accountId));
    this.isSelected.pipe(skipWhile(result => result), take(1))
      .subscribe(() => this.ngRedux.select(state => selectAccountForEdit(state))
        .subscribe(account => {
          this.updatedAccount=account;
          this.initializeForm(account);
          this.getWorkExperienceAsFormGroup(account);
          this.getEducationAsFormGroup(account);
        }));

  }

  private initializeForm(account:Account) {
    this.accountForm = this.formBuilder.group({
        firstName: [account.firstName, [Validators.required,Validators.maxLength(35),Validators.pattern(/^[A-z0-9]*$/)]],
        lastName: [account.lastName,[Validators.maxLength(35),Validators.pattern(/^[A-z0-9]*$/)]],
        birthday: [account.birthday],
        aboutMe: [account.aboutMe,Validators.maxLength(255)],
        workExperience: this.formBuilder.array([], Validators.maxLength(10)),
        education: this.formBuilder.array([],Validators.maxLength(10))
      }
    );
  }

  ChangeAccount(form:FormGroup): Account{
    this.updatedAccount.firstName = form.getRawValue().firstName;
    this.updatedAccount.lastName = form.getRawValue().lastName;
    this.updatedAccount.birthday = form.getRawValue().birthday;
    this.updatedAccount.aboutMe = form.getRawValue().aboutMe;
    this.updatedAccount.workExperiences = form.getRawValue().workExperience;
    this.updatedAccount.educations = form.getRawValue().education;
    this.updatedAccount.image=this.base64textString;
    return this.updatedAccount;
  }

  getWorkExperienceAsFormGroup(account:Account){
    this.workExperience = this.accountForm.get('workExperience') as FormArray;
     if(account.workExperiences!=null) account.workExperiences.forEach(value => {
       this.workExperience.push(this.formBuilder.group({
        id: value.id,
        workPlace: value.workPlace,
        position: value.position,
        start: value.start,
        finish: value.finish
      }));
    });
  }
  getEducationAsFormGroup(account:Account){
    this.education = this.accountForm.get('education') as FormArray;
    if(account.educations!=null) account.educations.forEach(value => {
      this.education.push(this.formBuilder.group({
        id: value.id,
        institution: value.institution,
        completionYear: value.completionYear
      }));
    });
  }

  createWorkExperienceItem(): FormGroup {
    return this.formBuilder.group({
      workPlace: '',
      position: '',
      start: new Date(),
      finish: new Date()
    },{validator: this.dateLessThan('start', 'finish')});
  }

  createEducationItem(): FormGroup {
    return this.formBuilder.group({
      institution: '',
      completionYear: ['', Validators.pattern('\\d{4,4}')]
    });
  }

 updateAccount(form) {
   this.ngRedux.dispatch(updateAccountAction({...this.ChangeAccount(form)}));
   this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(updateRouterState('/account/' + this.accountId)));
  }

  addWorkExperience(): void {
    this.workExperience = this.accountForm.get('workExperience') as FormArray;
    this.workExperience.push(this.createWorkExperienceItem());
  }
  deleteWorkExperience(index: number): void {
    this.workExperience = this.accountForm.get('workExperience') as FormArray;
    this.workExperience.removeAt(index);
  }
  addEducation(): void {
    this.education = this.accountForm.get('education') as FormArray;
    this.education.push(this.createEducationItem());
  }
  deleteEducation(index: number): void {
    this.education = this.accountForm.get('education') as FormArray;
    this.education.removeAt(index);
  }

  getImageAsString(base64textString: string){
    this.base64textString=base64textString;
}

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value&& t!=null) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
