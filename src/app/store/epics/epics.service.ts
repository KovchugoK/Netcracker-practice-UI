import {StartupEpic} from './startup.epic';
import {Injectable} from '@angular/core';
import {combineEpics} from 'redux-observable';
import {CurrentUserEpic} from './current-user.epic';

@Injectable()
export class EpicService {

  constructor(private startupEpic: StartupEpic, private currentUserEpic: CurrentUserEpic) {
  }

  getEpics() {
    return combineEpics(
      this.startupEpic.fetchStartups$,
      this.startupEpic.createStartup$,
      this.startupEpic.updateStartup$,
      this.startupEpic.deleteStartup$,
      this.startupEpic.selectStartup$,
      this.startupEpic.searchStartups$,
      this.currentUserEpic.loginUser$,
      this.currentUserEpic.logout$
    );
  }

}
