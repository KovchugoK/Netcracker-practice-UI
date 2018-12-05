import { NgModule } from '@angular/core';
import { StartupEpic } from './startup.epic';
import {ResumeEpic} from "./resume.epic";


@NgModule({
  providers: [
    StartupEpic,
    ResumeEpic
  ],
})
export class EpicsModule {}
