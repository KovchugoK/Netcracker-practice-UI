import {StartupEpic} from './startup.epic';
import {Injectable} from '@angular/core';
import {combineEpics} from 'redux-observable';
import {ResumeEpic} from "./resume.epic";

@Injectable()
export class EpicService {

  constructor(private startupEpic: StartupEpic, private resumeEpic: ResumeEpic) {
  }

  getEpics() {
    return combineEpics(
      this.startupEpic.fetchStartups$,
      this.startupEpic.createStartup$,
      this.startupEpic.updateStartup$,
      this.startupEpic.deleteStartup$,
      this.startupEpic.selectStartup$,
      this.resumeEpic.fetchResumes$,
      this.resumeEpic.selectResume$,
      this.resumeEpic.createResume$,
      this.resumeEpic.deleteResume$,
      this.resumeEpic.updateResume$,
      this.resumeEpic.fetchResumesSpecialists$
    );
  }

}
