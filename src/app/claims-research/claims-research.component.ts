import { Component, OnInit } from '@angular/core';
import {Requester} from '../../models/Requester';

@Component({
  selector: 'app-claims-research',
  templateUrl: './claims-research.component.html',
  styleUrls: ['./claims-research.component.css']
})
export class ClaimsResearchComponent implements OnInit {

  request: Requester;
  go = false;
  entitiesField: string;
  keywordsField: string;
  languagesField: string;
  sourcesField: string;

  constructor() {}

  ngOnInit() {
    this.request = new Requester();
  }

  goSearch(event): void {
    this.go = true;
  }

  addEntry(event, keyRequest, keyComponent): void {
    if (event.key === 'Enter') {
      if (this[keyComponent] !== '' && !this.request[keyRequest].includes(this[keyComponent])) {
        this.request[keyRequest].push(this[keyComponent]);
        this[keyComponent] = '';
      }
    }
  }

  deleteEnntry(keyRequest, value) {
    this.request[keyRequest] = this.request[keyRequest].filter(entryItem => entryItem !== value);
  }

  filterTruthRating($event, value) {
    if ($event.target.checked === true) {
      this.request.truthRatings.push(value);
    } else {
      this.request.truthRatings = this.request.truthRatings.filter(rating => rating !== value);
    }
  }

  goBackForm() {
    this.go = false;
    this.request.setPage(1);
  }
}
