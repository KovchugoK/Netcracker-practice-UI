import { NgModule } from '@angular/core';
import { StartupEpic } from './startup.epic';


@NgModule({
  providers: [
    StartupEpic
  ],
})
export class EpicsModule {}
