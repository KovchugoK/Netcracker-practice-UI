import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvestorListComponent} from './components/investor-list/investor-list.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {SpecialistListComponent} from './components/specialist-list/specialist-list.component';
import {StartupListComponent} from './components/startup-list/startup-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/main-page', pathMatch: 'full'},
  {path: 'main-page', component: MainPageComponent},
  {path: 'startup-list', component: StartupListComponent},
  {path: 'investor-list', component: InvestorListComponent},
  {path: 'specialist-list', component: SpecialistListComponent}
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
