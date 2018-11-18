import {StartupEpic} from './startup.epic';
import {Injectable} from '@angular/core';
import {combineEpics} from 'redux-observable';

@Injectable()
export class EpicService {

  constructor(private startupEpic: StartupEpic) {
  }

  getEpics() {
    return combineEpics(
      this.startupEpic.fetchStartups$,
      this.startupEpic.createStartup$,
      this.startupEpic.updateStartup$,
      this.startupEpic.deleteStartup$,
      this.startupEpic.selectStartup$
    );
  }

}
