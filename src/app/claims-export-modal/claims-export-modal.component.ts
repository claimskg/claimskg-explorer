import {Component, Inject, OnInit} from '@angular/core';
import {Requester} from '../../models/Requester';
import {MAT_DIALOG_DATA} from '@angular/material';
import {RequestUtils} from '../../models/utils/RequestUtils';
import {ClaimsExportService} from '../claims-export.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-claims-export-modal',
  templateUrl: './claims-export-modal.component.html',
  styleUrls: ['./claims-export-modal.component.css']
})
export class ClaimsExportModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public requester: Requester, private exportService: ClaimsExportService) {
    this.allchoices = [];
    for (const association of this.fieldsAssociation) {
      this.allchoices.push(association.field);
    }
    this.selectedFields = this.allchoices;
  }

  private fieldsAssociation = RequestUtils.fieldsAssociation;
  private allchoices: string[];
  private selectedFields: string[];
  private customSelection = false;
  private selectedFormat = 'text/csv';
  private loading = false;

  ngOnInit() {

  }

  checkField($event) {
    if ($event.target.checked === true) {
      this.selectedFields.push($event.target.value);
    } else {
      this.selectedFields = this.selectedFields.filter(selection => selection !== $event.target.value);
    }
  }

  goExport() {
    if (!this.customSelection) {
      this.selectedFields = this.allchoices;
    }
    this.loading = true;
    this.exportService.getDownloadClaimsExport(this.requester, this.selectedFields, this.selectedFormat)
      .subscribe(res => this.endLoading());
  }

  private endLoading() {
    this.loading = false;
  }

}
