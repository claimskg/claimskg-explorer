import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface ModalData {
  title: string;
  content: string[];
  imgsPath: string[];
}

@Component({
  selector: 'app-claims-help-modal',
  templateUrl: './claims-help-modal.component.html',
  styleUrls: ['./claims-help-modal.component.css']
})
export class ClaimsHelpModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) {}

  ngOnInit() {
  }

}
