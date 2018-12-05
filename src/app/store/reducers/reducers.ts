import { Reducer, combineReducers } from 'redux';
import { startupsReducer} from './startups.reducer';
import {startupPageReducer} from './startup-page.reducer';
import {routerReducer} from '@angular-redux/router';
import {dialogStateReducer} from './dialogs.reducer';
import {currentUserReducer} from './current-user.reducer';
import {startupSearchToolbarReducer} from './startup-search-toolbar.reducer';



export const reducers: Reducer = combineReducers({
  startupsState: startupsReducer,
  startupPageState: startupPageReducer,
  router: routerReducer,
  dialogsState: dialogStateReducer,
  currentUserState: currentUserReducer,
  startupSearchToolbarState: startupSearchToolbarReducer
});
