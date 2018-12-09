import { StartupsState } from './reducers/startups.reducer';
import {StartupPageState} from './reducers/startup-page.reducer';
import {DialogState} from './reducers/dialogs.reducer';
import {UserState} from './reducers/user.reducer';
import { AccountPageState} from './reducers/account-page.reducer';

export interface AppState {
  readonly startupsState?: StartupsState;
  readonly startupPageState?: StartupPageState;
  readonly router?: string;
  readonly dialogsState?: DialogState;
  readonly userState?: UserState;
  readonly accountPageState?: AccountPageState;
}
