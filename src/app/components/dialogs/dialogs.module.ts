import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogsComponent} from './dialogs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {MaterialModule} from '../../material';
import {DeleteStartupComponent} from './delete-startup/delete-startup.component';
import {DeleteResumeComponent} from './delete-resume/delete-resume.component';
import { MakeInvestmentsComponent } from './make-investments/make-investments.component';
import {DeleteFavoriteComponent} from "./delete-favorite/delete-favorite.component";
import {EnterEmailComponent} from "./enter-email/enter-email.component";
import {MakeInvestmentsComponent} from './make-investments/make-investments.component';
import {DeleteFavoriteComponent} from './delete-favorite/delete-favorite.component';
import {JoinStartupComponent} from './join-startup/join-startup.component';
import {RejectResumeComponent} from './reject-resume/reject-resume.component';
import {AcceptResumeComponent} from './accept-resume/accept-resume.component';
import {KickMemberComponent} from './kick-member/kick-member.component';
import {ChangeStartupRoleComponent} from './change-startup-role/change-startup-role.component';
import {RechargeBalanceComponent} from './recharge-balance/recharge-balance.component';
import {CancelResumeComponent} from './cancel-resume/cancel-resume.component';
import {LeaveStartupComponent } from './leave-startup/leave-startup.component';
import {DeleteResumeFromStartupComponent } from './delete-resume-from-startup/delete-resume-from-startup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [DialogsComponent, SignUpComponent, SignInComponent, DeleteStartupComponent, DeleteResumeComponent, MakeInvestmentsComponent, DeleteFavoriteComponent, EnterEmailComponent],
  exports: [DialogsComponent, SignUpComponent, SignInComponent, DeleteStartupComponent, DeleteResumeComponent, MakeInvestmentsComponent, DeleteFavoriteComponent, EnterEmailComponent],
  entryComponents: [SignUpComponent, SignInComponent, DeleteStartupComponent, DeleteResumeComponent, MakeInvestmentsComponent, DeleteFavoriteComponent, EnterEmailComponent ]
  declarations: [DialogsComponent, SignUpComponent,
    SignInComponent, DeleteStartupComponent,
    DeleteResumeComponent, MakeInvestmentsComponent,
    DeleteFavoriteComponent, JoinStartupComponent,
    RejectResumeComponent, AcceptResumeComponent,
    KickMemberComponent, ChangeStartupRoleComponent,
    RechargeBalanceComponent, CancelResumeComponent,
    LeaveStartupComponent, DeleteResumeFromStartupComponent],
  exports: [DialogsComponent, SignUpComponent,
    SignInComponent, DeleteStartupComponent,
    DeleteResumeComponent, MakeInvestmentsComponent,
    DeleteFavoriteComponent, JoinStartupComponent,
    RejectResumeComponent, AcceptResumeComponent,
    KickMemberComponent, ChangeStartupRoleComponent,
    RechargeBalanceComponent, CancelResumeComponent,
    LeaveStartupComponent, DeleteResumeFromStartupComponent],
  entryComponents: [SignUpComponent, SignInComponent,
    DeleteStartupComponent, DeleteResumeComponent,
    MakeInvestmentsComponent, DeleteFavoriteComponent,
    JoinStartupComponent, RejectResumeComponent, AcceptResumeComponent,
    KickMemberComponent, ChangeStartupRoleComponent,
    RechargeBalanceComponent, CancelResumeComponent,
    LeaveStartupComponent, DeleteResumeFromStartupComponent]
})
export class DialogsModule {
}
