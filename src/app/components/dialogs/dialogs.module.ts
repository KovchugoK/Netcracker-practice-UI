import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {MaterialModule} from '../../material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [DialogsComponent, SignUpComponent, SignInComponent],
  exports: [DialogsComponent, SignUpComponent, SignInComponent],
  entryComponents: [SignUpComponent, SignInComponent]
})
export class DialogsModule { }
