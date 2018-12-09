import {StartupEpic} from './startup.epic';
import {Injectable} from '@angular/core';
import {combineEpics} from 'redux-observable';
import {AccountEpic} from "./account.epic";

@Injectable()
export class EpicService {

  constructor(private startupEpic: StartupEpic, private  accountEpic: AccountEpic) {
  }

  getEpics() {
    return combineEpics(
      this.startupEpic.fetchStartups$,
      this.startupEpic.createStartup$,
      this.startupEpic.updateStartup$,
      this.startupEpic.deleteStartup$,
      this.startupEpic.selectStartup$,
      this.accountEpic.selectAccount$,
    );
  }

}
