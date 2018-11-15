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
import {UserSidenavComponent} from './components/user-sidenav/user-sidenav.component';
import {StartupComponent} from './components/startup/startup.component';
import {StartupEditComponent} from './components/startup-edit/startup-edit.component';
import {ResumeDetailComponent} from './components/resume-detail/resume-detail.component';
import {ResumeListComponent} from './components/resume-list/resume-list.component';
import {MatChip, MatChipList, MatChipsModule, MatDialogModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    StartupListComponent,
    SpecialistListComponent,
    InvestorListComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    UserSidenavComponent,
    StartupComponent,
    StartupEditComponent,
    ResumeDetailComponent,
    ResumeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule
  ],
  entryComponents: [
    ResumeDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
