import { Reducer, combineReducers } from 'redux';
import { startupsReducer} from './startups.reducer';
import {startupPageReducer} from './startup-page.reducer';
import {routerReducer} from '@angular-redux/router';
import {dialogStateReducer} from './dialogs.reducer';
import {userReducer} from './user.reducer';
import {resumeReducer} from "./resume.reduser";
import {resumePageReducer} from "./resume-page.reducer";



export const reducers: Reducer = combineReducers({
  startupsState: startupsReducer,
  startupPageState: startupPageReducer,
  router: routerReducer,
  dialogsState: dialogStateReducer,
  userState: userReducer,
  resumeState: resumeReducer,
  resumePageState: resumePageReducer
});
