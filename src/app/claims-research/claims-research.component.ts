import { Component, OnInit } from '@angular/core';
import {Requester} from '../../models/Requester';
import {Language} from '../../models/utils/Language';
import {Organization} from '../../models/utils/Organization';
import {UtilsDataSparqlService} from '../utils-data-sparql.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

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
  allLanguages: Language[];
  filteredLanguages: Observable<Language[]>;
  allSources: Organization[];
  filteredSources: Observable<Organization[]>;
  controlLanguage = new FormControl();
  controlSources = new FormControl();

  constructor(private utilsDataService: UtilsDataSparqlService) {}

  ngOnInit() {
    this.request = new Requester();
    this.utilsDataService.getAllLanguages().subscribe(languages => this.setUpFilterLanguages(languages));
    this.utilsDataService.getAllSources().subscribe(sources => this.setUpFilterSources(sources));
  }

  goSearch(event): void {
    this.go = true;
  }

  addEntry(event, keyRequest, keyComponent): void {
    if (event.key === 'Enter') {
      this.addDataToRequester(keyRequest, keyComponent);
    }
  }

  addEntryClickFiltered(toBlurId, keyRequest, keyComponent): void {
    document.getElementById(toBlurId).blur();
    this.addDataToRequester(keyRequest, keyComponent);
  }

  private addDataToRequester(keyRequest, keyComponent): void {
    if (this[keyComponent] !== '' && !this.request[keyRequest].includes(this[keyComponent])) {
      this.request[keyRequest].push(this[keyComponent]);
      this[keyComponent] = '';
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

  private setUpFilter(keyList, keyFilter, keyControl, list, filterFunction): void {
    this[keyList] = list;
    this[keyFilter] = this[keyControl].valueChanges
      .pipe(
        startWith(''),
        map(value => this[filterFunction](value))
      );
  }

  private setUpFilterLanguages(languages): void {
    this.setUpFilter('allLanguages', 'filteredLanguages', 'controlLanguage', languages, '_filter_language');
  }

  private setUpFilterSources(sources): void {
    this.setUpFilter('allSources', 'filteredSources', 'controlSources', sources, '_filter_source');
  }

  // Are used (by generic method setUpFiltezr)
  private _filter_language(value: string): Language[] {
    const filterValue = value.toLowerCase();
    return this.allLanguages.filter(language => language.name.toLowerCase().includes(filterValue));
  }

  private _filter_source(value: string): Organization[] {
    const filterValue = value.toLowerCase();
    return this.allSources.filter(source => source.name.toLowerCase().includes(filterValue));
  }
}
