import { NgModule } from '@angular/core';
import { StartupEpic } from './startup.epic';
import {AccountEpic} from "./account.epic";
import {ResumeEpic} from "./resume.epic";
import {CurrentUserEpic} from './current-user.epic';
import {ContactsEpic} from './contacts.epic';


@NgModule({
  providers: [
    StartupEpic,
    ResumeEpic,
    CurrentUserEpic,
    ContactsEpic
    CurrentUserEpic,
    StartupEpic,
    AccountEpic
  ],
})
export class EpicsModule {}
