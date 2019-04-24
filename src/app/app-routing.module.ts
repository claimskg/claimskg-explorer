import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClaimsResearchComponent} from './claims-research/claims-research.component';
import {ClaimsHomeComponent} from './claims-home/claims-home.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';
import {ClaimHelpComponent} from './claim-help/claim-help.component';
import {ClaimsListComponent} from './claims-list/claims-list.component';
import {ClaimsAboutComponent} from './claims-about/claims-about.component';
import {ClaimsStatisticsComponent} from './claims-statistics/claims-statistics.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ClaimsHomeComponent},
  { path: 'search', component: ClaimsListComponent, pathMatch: 'full'},
  { path: 'research', component: ClaimsResearchComponent, pathMatch: 'full'},
  { path: 'detail/:id', component: ClaimDetailComponent},
  { path: 'about', component: ClaimHelpComponent },
  { path: 'contact', component: ClaimsAboutComponent },
  { path: 'statistics', component: ClaimsStatisticsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
