import {Component, OnInit} from '@angular/core';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Startup} from '../../model/Startup';
import {Account} from '../../model/Account';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {skipWhile, take} from 'rxjs/internal/operators';
import {isLoading, selectStartupForEdit, isSelected} from '../../store/selectors/startups.selector';
import {createStartupAction, updateStartupAction} from '../../store/actions/startups.actions';
import {Observable} from 'rxjs';
import {selectStartup} from '../../store/actions/startup-state.actions';
import {updateRouterState} from '../../store/actions/router.actions';
import {StartupResume} from '../../model/StartupResume';
import {showDialogAction} from '../../store/actions/dialogs.actions';
import {RejectResumeComponent} from '../dialogs/reject-resume/reject-resume.component';
import {AcceptResumeComponent} from '../dialogs/accept-resume/accept-resume.component';
import {KickMemberComponent} from '../dialogs/kick-member/kick-member.component';
import {ChangeStartupRoleComponent} from '../dialogs/change-startup-role/change-startup-role.component';

@Component({
  selector: 'app-startup-edit',
  templateUrl: './startup-edit.component.html',
  styleUrls: ['./startup-edit.component.css']
})
export class StartupEditComponent implements OnInit {

  startupForm: FormGroup;
  id: string;

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(isSelected)
  isSelected: Observable<boolean>;

  pendingResumes: StartupResume[];
  currentStartup: Startup;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectStartup(this.id));
    this.isSelected.pipe(skipWhile(result => result), take(1))
      .subscribe(() => this.ngRedux.select(state => selectStartupForEdit(state))
        .subscribe(startup => {
          {
            if (startup) {
              this.currentStartup = startup;
            }
            this.initializeForm(startup);
            if (this.id !== null) {
              this.checkPending(startup);
            }
          }
        }));
  }

  private initializeForm(startup: Startup) {
    this.startupForm = this.fb.group({
      startupName: [startup.startupName, Validators.required],
      idea: [startup.idea],
      sumOfInvestment: [startup.sumOfInvestment, Validators.pattern('[1-9][0-9]*')],
      aboutProject: [startup.aboutProject],
      businessPlan: [startup.businessPlan],
      account: [this.ngRedux.getState().currentUserState.currentUser.account],
      startupResumes: [startup.startupResumes],
      image: [''],
      nonBlock: [this.ngRedux.getState().router === '/startup-edit' ? true : startup.nonBlock]
    });
  }


  get startupName(): FormControl {
    return this.startupForm.get('startupName') as FormControl;
  }

  get idea(): FormControl {
    return this.startupForm.get('idea') as FormControl;
  }

  get sumOfInvestment(): FormControl {
    return this.startupForm.get('sumOfInvestment') as FormControl;
  }

  get aboutProject(): FormControl {
    return this.startupForm.get('aboutProject') as FormControl;
  }

  get businessPlan(): FormControl {
    return this.startupForm.get('businessPlan') as FormControl;
  }

  getAccount(): Account {
    return this.startupForm.get('account').value as Account;
  }

  goBack(): void {
    this.location.back();
  }

  updateStartup() {
    this.ngRedux.dispatch(updateStartupAction({
      ...this.startupForm.value, id: this.id, startupResumes: this.currentStartup.startupResumes, startupRoles: this.currentStartup.startupRoles,
      startupInvestments: this.currentStartup.startupInvestments, compressedImageId: this.currentStartup.compressedImageId,
      dateOfCreation: this.currentStartup.dateOfCreation, imageId: this.currentStartup.imageId, account: this.currentStartup.account
    }));
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(updateRouterState('/startup/' + this.id)));
  }

  createStartup() {
    this.ngRedux.dispatch(createStartupAction({...this.startupForm.value, id: this.id, dateOfCreation: '2018-12-10 10:23:40.433000' }));
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(updateRouterState('/startup-list')));
  }

  getImageAsString(base64textString: string) {
    this.startupForm.controls['image'].setValue(base64textString);
  }

  checkPending(startup: Startup) {
    this.pendingResumes = startup.startupResumes.filter(value => value.accepted === false);
  }

  rejectResume(id: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: RejectResumeComponent,
      width: '300px',
      data: {resumeId: id}
    }));
  }

  acceptResume(resumeId: string, accountId: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: AcceptResumeComponent,
      width: '300px',
      data: {resumeId: resumeId, accountId: accountId}
    }));
  }

  kickMember(id: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: KickMemberComponent,
      width: '300px',
      data: {resumeId: id}
    }));
  }

  changeRole(accountId: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: ChangeStartupRoleComponent,
      width: '300px',
      data: {accountId: accountId}
    }));
  }
}
