import { StartupsState } from './reducers/startups.reducer';
import {StartupPageState} from './reducers/startup-page.reducer';
import {DialogState} from './reducers/dialogs.reducer';
import {CurrentUserState} from './reducers/current-user.reducer';
import {StartupSearchToolbarState} from './reducers/startup-search-toolbar.reducer';
import {ResumeState} from "./reducers/resume.reduser";
import {ResumePageState} from "./reducers/resume-page.reducer";


export interface AppState {
  readonly startupsState?: StartupsState;
  readonly startupPageState?: StartupPageState;
  readonly router?: string;
  readonly dialogsState?: DialogState;
  readonly currentUserState?: CurrentUserState;
  readonly startupSearchToolbarState?: StartupSearchToolbarState;
  readonly resumeState?: ResumeState;
  readonly resumePageState?: ResumePageState;
}
