import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvestorListComponent} from './components/investor-list/investor-list.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {SpecialistListComponent} from './components/specialist-list/specialist-list.component';
import {StartupListComponent} from './components/startup-list/startup-list.component';

import {FavoriteComponent} from "./components/favorite/favorite.component";

import {StartupComponent} from './components/startup/startup.component';
import {StartupEditComponent} from './components/startup-edit/startup-edit.component';
import {ResumeListComponent} from './components/resume-list/resume-list.component';
import {ResumeDetailDialogComponent} from './components/resume-detail-dialog/resume-detail-dialog.component';


const routes: Routes = [
  {path: '', redirectTo: '/main-page', pathMatch: 'full'},
  {path: 'main-page', component: MainPageComponent},
  {path: 'startup-list', component: StartupListComponent},
  {path: 'investor-list', component: InvestorListComponent},
  {path: 'specialist-list', component: SpecialistListComponent},
  {path: 'startup/:id', component: StartupComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'startup-edit/:id', component: StartupEditComponent},
  {path: 'startup-edit', component: StartupEditComponent},
  {path: 'resume/list', component: ResumeListComponent},
  {path: 'resume/:id', component: ResumeDetailDialogComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
