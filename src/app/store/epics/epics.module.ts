import { NgModule } from '@angular/core';
import { StartupEpic } from './startup.epic';
import {CurrentUserEpic} from './current-user.epic';


@NgModule({
  providers: [
    StartupEpic,
    CurrentUserEpic
  ],
})
export class EpicsModule {}
