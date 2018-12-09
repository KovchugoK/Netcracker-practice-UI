import { NgModule } from '@angular/core';
import { StartupEpic } from './startup.epic';
import {AccountEpic} from "./account.epic";
import {ResumeEpic} from "./resume.epic";
import {CurrentUserEpic} from './current-user.epic';


@NgModule({
  providers: [
    StartupEpic,
    ResumeEpic,
    CurrentUserEpic,
    StartupEpic,
    AccountEpic
  ],
})
export class EpicsModule {}
