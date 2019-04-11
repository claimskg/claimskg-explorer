import {Component, Inject, OnInit} from '@angular/core';
import {Requester} from '../../models/Requester';
import {MAT_DIALOG_DATA} from '@angular/material';
import {RequestUtils} from '../../models/utils/RequestUtils';
import {ClaimsExportService} from '../claims-export.service';

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

  fieldsAssociation = RequestUtils.fieldsAssociation;
  allchoices: string[];
  selectedFields: string[];
  customSelection = false;
  selectedFormat = 'text/csv';
  loading = false;

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
      .subscribe(res => this.downloadResult(res, this.selectedFormat));
  }

  private downloadResult(result, type) {
    this.exportService.performDownload(result, type);
    this.loading = false;
  }
}
