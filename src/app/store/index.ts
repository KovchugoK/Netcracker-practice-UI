import { StartupsState } from './reducers/startups.reducer';
import {StartupPageState} from './reducers/startup-page.reducer';
import {DialogState} from './reducers/dialogs.reducer';
import {CurrentUserState} from './reducers/current-user.reducer';
import {StartupSearchToolbarState} from './reducers/startup-search-toolbar.reducer';
import {ResumeState} from './reducers/resume.reduser';
import {ResumePageState} from './reducers/resume-page.reducer';
import {UserSideNavState} from './reducers/user-side-nav.reducer';
import {ContactsState} from './reducers/contacts.reducer';
import { AccountPageState} from './reducers/account-page.reducer';
import {SpecialistsSearchToolbarState} from "./reducers/specialists-search-toolbar.reducer";


export interface AppState {
  readonly startupsState?: StartupsState;
  readonly startupPageState?: StartupPageState;
  readonly router?: string;
  readonly dialogsState?: DialogState;
  readonly currentUserState?: CurrentUserState;
  readonly startupSearchToolbarState?: StartupSearchToolbarState;
  readonly resumeState?: ResumeState;
  readonly resumePageState?: ResumePageState;
  readonly userSideNavState?: UserSideNavState;
  readonly contactsState?: ContactsState;
  readonly accountPageState?: AccountPageState;
  readonly specialistsSearchState?: SpecialistsSearchToolbarState;
}


