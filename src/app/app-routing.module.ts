import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {SpecialistListComponent} from './components/specialist-list/specialist-list.component';
import {StartupListComponent} from './components/startup-list/startup-list.component';
import {AccountComponent} from './components/account/account.component';
import {FavoriteComponent} from './components/favorite/favorite.component';
import {StartupComponent} from './components/startup/startup.component';
import {StartupEditComponent} from './components/startup-edit/startup-edit.component';
import {AuthGuard} from './guards/auth.guard';
import {ResumeListComponent} from './components/resume-list/resume-list.component';
import {ResumeDetailDialogComponent} from './components/resume-detail-dialog/resume-detail-dialog.component';
import {MyStartupsComponent} from './components/my-startups/my-startups.component';
import {ResumeEditComponent} from './components/resume-edit/resume-edit.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AccountEditComponent} from './components/account-edit/account-edit.component';
import {ConversationComponent} from './components/conversation/conversation.component';
import {ConversationListComponent} from './components/conversation-list/conversation-list.component';
import {AccountEditGuard} from './guards/account-edit.guard';
import {StartupEditGuard} from './guards/startup-edit.guard';
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";


const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'main-page', component: MainPageComponent},
  {path: 'startup-list', component: StartupListComponent},
  {path: 'specialist-list/:id', component: AccountComponent},
  {path: 'specialist-list', component: SpecialistListComponent},
  {path: 'startup/:id', component: StartupComponent},
  {path: 'startup-edit/:id', component: StartupEditComponent, canActivate: [AuthGuard, StartupEditGuard]},
  {path: 'startup-edit', component: StartupEditComponent, canActivate: [AuthGuard]},
  {path: 'favorites/:id', component: FavoriteComponent},
  {path: 'resume/list', component: ResumeListComponent},
  {path: 'resume/:id', component: ResumeDetailDialogComponent},
  {path: 'resume-edit/:id', component: ResumeEditComponent},
  {path: 'resume-edit', component: ResumeEditComponent},
  {path: 'contacts/:id', component: ContactsComponent},
  {path: 'my-startups', component: MyStartupsComponent},
  {path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'account-edit/:id', component: AccountEditComponent, canActivate: [AccountEditGuard]},
  {path: 'conversations/:id', component: ConversationComponent},
  {path: 'conversations', component: ConversationListComponent},
  {path: 'changePassword', component: ResetPasswordComponent},
  {path: 'verifyEmail', component: VerifyEmailComponent},
  {path: '**', redirectTo: 'main-page'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
