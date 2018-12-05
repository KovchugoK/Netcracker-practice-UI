import { StartupsState } from './reducers/startups.reducer';
import {StartupPageState} from './reducers/startup-page.reducer';
import {DialogState} from './reducers/dialogs.reducer';
import {UserState} from './reducers/user.reducer';
import {ResumeState} from "./reducers/resume.reduser";
import {ResumePageState} from "./reducers/resume-page.reducer";


export interface AppState {
  readonly startupsState?: StartupsState;
  readonly startupPageState?: StartupPageState;
  readonly router?: string;
  readonly dialogsState?: DialogState;
  readonly userState?: UserState;
  readonly resumeState?: ResumeState;
  readonly resumePageState?: ResumePageState;
}
