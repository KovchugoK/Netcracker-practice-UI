import {Reducer, combineReducers} from 'redux';
import {startupsReducer} from './startups.reducer';
import {startupPageReducer} from './startup-page.reducer';
import {routerReducer} from '@angular-redux/router';
import {dialogStateReducer} from './dialogs.reducer';
import {resumeReducer} from './resume.reduser';
import {resumePageReducer} from './resume-page.reducer';
import {currentUserReducer} from './current-user.reducer';
import {startupSearchToolbarReducer} from './startup-search-toolbar.reducer';
import {userSideNavReducer} from './user-side-nav.reducer';
import {contactsReducer} from './contacts.reducer';
import {specialistsSearchToolbarReducer} from './specialists-search-toolbar.reducer';
import {conversationsReducer} from './conversation.reducer';


export const reducers: Reducer = combineReducers({
  startupsState: startupsReducer,
  startupPageState: startupPageReducer,
  router: routerReducer,
  dialogsState: dialogStateReducer,
  resumeState: resumeReducer,
  resumePageState: resumePageReducer,
  currentUserState: currentUserReducer,
  startupSearchToolbarState: startupSearchToolbarReducer,
  userSideNavState: userSideNavReducer,
  contactsState: contactsReducer,
  specialistsSearchState: specialistsSearchToolbarReducer,
  conversationsState: conversationsReducer
});
