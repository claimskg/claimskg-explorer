import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClaimsResearchComponent} from './claims-research/claims-research.component';
import {ClaimsHomeComponent} from './claims-home/claims-home.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';
import {ClaimHelpComponent} from './claim-help/claim-help.component';
import {ClaimsListComponent} from './claims-list/claims-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ClaimsHomeComponent},
  { path: 'search', component: ClaimsListComponent },
  { path: 'research', component: ClaimsResearchComponent },
  { path: 'detail/:id', component: ClaimDetailComponent },
  { path: 'help', component: ClaimHelpComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
