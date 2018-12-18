import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {MaterialModule} from '../../material';
import {DeleteStartupComponent} from './delete-startup/delete-startup.component';
import {DeleteResumeComponent} from "./delete-resume/delete-resume.component";
import {DeleteFavoriteComponent} from "./delete-favorite/delete-favorite.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [DialogsComponent, SignUpComponent, SignInComponent, DeleteStartupComponent, DeleteResumeComponent, DeleteFavoriteComponent],
  exports: [DialogsComponent, SignUpComponent, SignInComponent, DeleteStartupComponent, DeleteResumeComponent, DeleteFavoriteComponent],
  entryComponents: [SignUpComponent, SignInComponent, DeleteStartupComponent, DeleteResumeComponent, DeleteFavoriteComponent ]
})
export class DialogsModule { }
