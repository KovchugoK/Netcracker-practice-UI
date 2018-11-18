import { StartupsState } from './reducers/startups.reducer';
import {StartupPageState} from './reducers/startup-page.reducer';
import {DialogState} from './reducers/dialogs.reducer';
import {UserState} from './reducers/user.reducer';


export interface AppState {
  readonly startupsState?: StartupsState;
  readonly startupPageState?: StartupPageState;
  readonly router?: string;
  readonly dialogsState?: DialogState;
  readonly userState?: UserState;
}
