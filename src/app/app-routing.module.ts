import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClaimsResearchComponent} from './claims-research/claims-research.component';


const routes: Routes = [
  { path: 'research', component: ClaimsResearchComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
