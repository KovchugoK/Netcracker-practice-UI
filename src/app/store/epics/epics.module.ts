import { NgModule } from '@angular/core';
import { StartupEpic } from './startup.epic';
import {AccountEpic} from "./account.epic";


@NgModule({
  providers: [
    StartupEpic,
    AccountEpic
  ],
})
export class EpicsModule {}
