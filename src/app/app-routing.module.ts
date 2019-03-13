import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClaimsResearchComponent} from './claims-research/claims-research.component';
import {ClaimsHomeComponent} from './claims-home/claims-home.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ClaimsHomeComponent},
  { path: 'research', component: ClaimsResearchComponent },
  { path: 'detail/:id', component: ClaimDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
