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
import {MatDialogModule} from '@angular/material/dialog';
import 'hammerjs';

import { ClaimsHomeComponent } from './claims-home/claims-home.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClaimHelpComponent } from './claim-help/claim-help.component';
import { ClaimsHelpModalComponent } from './claims-help-modal/claims-help-modal.component';
import { ClaimsAboutComponent } from './claims-about/claims-about.component';
import { ClaimsExportModalComponent } from './claims-export-modal/claims-export-modal.component';
import { ClaimsStatisticsComponent } from './claims-statistics/claims-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimsListComponent,
    ClaimsResearchComponent,
    ClaimsHomeComponent,
    ClaimDetailComponent,
    ClaimHelpComponent,
    ClaimsHelpModalComponent,
    ClaimsExportModalComponent,
    ClaimsAboutComponent,
    ClaimsStatisticsComponent,
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
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ClaimsHelpModalComponent,
    ClaimsExportModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
