import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {ResumeDetailDialogComponent} from './components/resume-detail-dialog/resume-detail-dialog.component';
import {ResumeListComponent} from './components/resume-list/resume-list.component';
import {
  MatDialogModule, MatListModule, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule,
  MatMenuModule, MatProgressBarModule, MatDatepickerModule,
  MatNativeDateModule, MatInputModule
} from '@angular/material';
import { MyStartupsComponent } from './components/my-startups/my-startups.component';
import { StartupSearchToolbarComponent } from './components/startup-search-toolbar/startup-search-toolbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ResumeEditComponent } from './components/resume-edit/resume-edit.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import {GlobalUserStorageService} from './services/global-storage.service';
import { AccountComponent } from './components/account/account.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { MessagesComponent } from './components/messages/messages.component';
import {ConversationComponent} from './components/conversation/conversation.component';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';
import {AuthenticationService} from './services/authentication.service';

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
    ResumeListComponent,
    ToolbarComponent,
    ResumeEditComponent,
    ContactsComponent,
    MyStartupsComponent,
    StartupSearchToolbarComponent,
    AccountComponent,
    AccountEditComponent,
    ResumeListComponent,
    ImageUploadComponent,
    MessagesComponent,
    ConversationComponent,
    ImageUploadComponent,
    StartupSearchToolbarComponent,
    AccountComponent,
    AccountEditComponent,
    ResumeListComponent,
    ImageUploadComponent,
    ConversationComponent,
    StartupSearchToolbarComponent
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
    MatListModule,
    FlexLayoutModule,
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FlexLayoutModule,
    NgxPermissionsModule.forRoot(),
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
              private devTools: DevToolsExtension,
              private storageService: GlobalUserStorageService,
              private auth: AuthenticationService) {
    const epics = this.epicService.getEpics();
    const middleware = createEpicMiddleware();
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [devTools.enhancer()];
    }
    ngRedux.configureStore(reducers, this.storageService.getInitialState(), [middleware, thunkMiddlware, createLogger()], enhancers);
    middleware.run(epics as any);
    ngReduxRouter.initialize((state: AppState) => state.router);
    if (this.ngRedux.getState().currentUserState.currentUser) {
      this.auth.addRole(this.ngRedux.getState().currentUserState.currentUser.roles);
    }
  }


}
