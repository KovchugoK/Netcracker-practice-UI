import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {StartupListComponent} from './components/startup-list/startup-list.component';
import {SpecialistListComponent} from './components/specialist-list/specialist-list.component';
import {InvestorListComponent} from './components/investor-list/investor-list.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import {FooterComponent} from './components/footer/footer.component';
import {FavoriteComponent} from './components/favorite/favorite.component';
import {UserSidenavComponent} from './components/user-sidenav/user-sidenav.component';
import {StartupComponent} from './components/startup/startup.component';
import {StartupEditComponent} from './components/startup-edit/startup-edit.component';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {EpicsModule} from './store/epics/epics.module';
import {AppState} from './store';
import {EpicService} from './store/epics/epics.service';
import {createEpicMiddleware} from 'redux-observable';
import {reducers} from './store/reducers/reducers';
import thunkMiddlware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {StartupService} from './services/startup.service';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {DialogsModule} from './components/dialogs/dialogs.module';
import {FavoriteComponent} from './components/favorite/favorite.component';
// import {ResumeDetailComponent} from './components/resume-detail/resume-detail.component';
import {ResumeDetailDialogComponent} from './components/resume-detail-dialog/resume-detail-dialog.component';
import {ResumeListComponent} from './components/resume-list/resume-list.component';
import {MatChipsModule, MatDialogModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    StartupListComponent,
    SpecialistListComponent,
    InvestorListComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    FavoriteComponent,
    UserSidenavComponent,
    StartupComponent,
    StartupEditComponent,
    ResumeDetailDialogComponent,
    ResumeListComponent
  ],
  imports: [
    BrowserModule,
    EpicsModule,
    // import main NgReduxModule
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogsModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule
  ],
  entryComponents: [
    ResumeDetailDialogComponent

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    EpicService,
    StartupService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {


  constructor(private ngRedux: NgRedux<AppState>,
              private ngReduxRouter: NgReduxRouter,
              private epicService: EpicService,
              private devTools: DevToolsExtension) {
    const epics = this.epicService.getEpics();
    const middleware = createEpicMiddleware();
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [devTools.enhancer()];
    }
    ngRedux.configureStore(reducers, {} as AppState, [middleware, thunkMiddlware, createLogger()], enhancers);
    middleware.run(epics as any);
    ngReduxRouter.initialize(state => state.route);

  }


}

