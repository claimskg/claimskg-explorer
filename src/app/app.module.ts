import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ClaimsListComponent } from './claims-list/claims-list.component';
import { ClaimsResearchComponent } from './claims-research/claims-research.component';
import { AppRoutingModule } from './app-routing.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { MatAutocompleteModule, MatInputModule, MatExpansionModule, MatListModule, MatPaginatorModule,
  MatFormFieldModule, MatButtonModule } from '@angular/material';
import 'hammerjs';

import { ClaimsHomeComponent } from './claims-home/claims-home.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClaimHelpComponent } from './claim-help/claim-help.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimsListComponent,
    ClaimsResearchComponent,
    ClaimsHomeComponent,
    ClaimDetailComponent,
    ClaimHelpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
