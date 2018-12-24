import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {MaterialModule} from '../../material';
import {DeleteStartupComponent} from './delete-startup/delete-startup.component';
import {DeleteResumeComponent} from './delete-resume/delete-resume.component';
import { MakeInvestmentsComponent } from './make-investments/make-investments.component';
import {DeleteFavoriteComponent} from "./delete-favorite/delete-favorite.component";
import {EnterEmailComponent} from "./enter-email/enter-email.component";

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
})
export class DialogsModule { }
