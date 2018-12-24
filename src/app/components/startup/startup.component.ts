import {Component, OnInit} from '@angular/core';
import {Startup} from '../../model/Startup';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {
  isSelected,
  selectStartupFromState
} from '../../store/selectors/startups.selector';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {selectStartup} from '../../store/actions/startup-state.actions';
import {showDialogAction} from '../../store/actions/dialogs.actions';
import {DeleteStartupComponent} from '../dialogs/delete-startup/delete-startup.component';
import {selectCurrentUser} from '../../store/selectors/current-user.selector';
import {User} from '../../model/User';
import {MakeInvestmentsComponent} from '../dialogs/make-investments/make-investments.component';
import {Investment} from '../../model/Investment';
import {skipWhile, take} from 'rxjs/internal/operators';
import {AdminService} from '../../services/admin.service';
import {JoinStartupComponent} from '../dialogs/join-startup/join-startup.component';
import {StartupResume} from '../../model/StartupResume';
import {CancelResumeComponent} from '../dialogs/cancel-resume/cancel-resume.component';
import {LeaveStartupComponent} from '../dialogs/leave-startup/leave-startup.component';
import {DeleteResumeFromStartupComponent} from '../dialogs/delete-resume-from-startup/delete-resume-from-startup.component';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  id: string;

  @select(isSelected)
  isSelected: Observable<boolean>;

  @select(selectStartupFromState)
  startup: Observable<Startup>;

  @select(selectCurrentUser)
  currentUser: Observable<User>;

  investments: Investment[];
  currentInvestments: number;
  myPendingResumes: StartupResume[];
  permissionToEdit = false;
  permissionToLeave = false;

  constructor(private ngRedux: NgRedux<AppState>,
              private startupService: StartupService,
              private route: ActivatedRoute,
              private  adminService: AdminService
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ngRedux.dispatch(selectStartup(this.id));

    this.isSelected.pipe(skipWhile(result => result === true), take(1)).subscribe(() =>
      // this.ngRedux.select(selectStartupFromState).subscribe(startup => {
      this.startup.subscribe(startup => {
        if (this.ngRedux.getState().currentUserState.currentUser !== null) {
          this.checkPermissionToEdit(startup);
          this.checkStartupMembership(startup);
          this.myPendingResumes = startup.startupResumes
            .filter(value => value.resume.account.id === this.ngRedux.getState().currentUserState.currentUser.account.id
              && value.accepted === false);
        }
        this.currentInvestments = startup.startupInvestments.map(value => value.sumOfInvestment).reduce((a, b) => a + b, 0);
        this.transformInvestments(startup.startupInvestments);
        return this.investments.sort(
          (value1, value2) => value2.sumOfInvestment - value1.sumOfInvestment);
      }));
  }

  transformInvestments(investments: Investment[]) {
    const transformInvestments = investments.map(value => {
      return {investor: value.investor, sumOfInvestment: value.sumOfInvestment};
    });

    const result = transformInvestments.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        return obj.investor.id === val.investor.id;
      }).pop() || {investor: val.investor, sumOfInvestment: 0};
      o.sumOfInvestment += val.sumOfInvestment;
      acc.push(o);
      return acc;
    }, []);

    const unique = result.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    this.investments = unique;
  }

  checkPermissionToEdit(startup: Startup) {
    this.permissionToEdit = startup.startupRoles
      .find(value => value.accountId ===
        this.ngRedux.getState().currentUserState.currentUser.account.id && value.roleName === 'MODERATOR') !== undefined;
  }

  checkStartupMembership(startup: Startup) {
    this.permissionToLeave = startup.startupRoles
      .find(value => value.accountId ===
        this.ngRedux.getState().currentUserState.currentUser.account.id) !== undefined;
  }

  cancelResume(id: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: CancelResumeComponent,
      width: '210px',
      data: {resumeId: id}
    }));
  }

  deleteStartup() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteStartupComponent,
      width: '210px',
      data: {startupId: this.id}
    }));
  }

  makeInvestments() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: MakeInvestmentsComponent,
      width: '450px',
      data: {startupId: this.id}
    }));
  }

  leaveStartup() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: LeaveStartupComponent,
      width: '210px',
      data: {accountId: this.ngRedux.getState().currentUserState.currentUser.account.id}
    }));
  }

  deleteMyResumeFromStartup(id: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteResumeFromStartupComponent,
      width: '210px',
      data: {resumeId: id}
    }));
  }

  getStartupRole(accountId: string): string {
    const st = this.currentStartup.startupRoles;
    const startupRole = st.find(value => value.accountId === accountId);
    if (startupRole !== undefined && startupRole.roleName !== 'MEMBER') {
      return  '(' + startupRole.roleName + ')';
    }
    return '';
  }

  joinStartup() {
    this.ngRedux.dispatch(showDialogAction({
      componentType: JoinStartupComponent,
      width: '600px',
      data: {startupId: this.id}
    }));
  }

  get currentStartup(): Startup {
    return this.ngRedux.getState().startupPageState.startupModel;
  }

  blockStartup(startup: Startup) {
    this.adminService.blockStartup(startup).subscribe();
    startup.nonBlock = false;
  }

  unBlockStartup(startup: Startup) {
    this.adminService.unBlockStartup(startup).subscribe();
    startup.nonBlock = true;
  }


}
