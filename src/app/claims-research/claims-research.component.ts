import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Requester} from '../../models/Requester';
import {Language} from '../../models/utils/Language';
import {Organization} from '../../models/utils/Organization';
import {UtilsDataSparqlService} from '../utils-data-sparql.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {ClaimsListComponent} from '../claims-list/claims-list.component';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-claims-research',
  templateUrl: './claims-research.component.html',
  styleUrls: ['./claims-research.component.css']
})
export class ClaimsResearchComponent implements OnInit, AfterViewInit {

  request: Requester;
  go = false;
  entitiesField: string;
  keywordsField: string;
  allLanguages: Language[];
  filteredLanguages: Observable<Language[]>;
  allSources: Organization[];
  filteredSources: Observable<Organization[]>;
  controlLanguage = new FormControl();
  controlSources = new FormControl();

  @ViewChild(ClaimsListComponent) resultList: ClaimsListComponent;
  @ViewChildren(ClaimsListComponent) initDetector: QueryList<ClaimsListComponent>;
  childInit = false;

  constructor(private utilsDataService: UtilsDataSparqlService, private titleService: Title, private location: Location) {}

  ngOnInit() {
    this.request = new Requester();
    this.utilsDataService.getAllLanguages().subscribe(languages => this.setUpFilterLanguages(languages));
    this.utilsDataService.getAllSources().subscribe(sources => this.setUpFilterSources(sources));
    this.setTitle();
  }

  ngAfterViewInit(): void {
    this.initDetector.changes.subscribe(event => this.resultListInit(event));
  }

  private resultListInit(event) {
    if (event.length !== 0) {   // The component is initialized
      setTimeout(() => { this.childInit = true; });
    }
  }

  goSearch(event): void {
    this.go = true;
  }

  addEntry(event, keyRequest, keyComponent): void {
    if (event.key === 'Enter') {
      this.addDataToRequesterNormal(keyRequest, keyComponent);
    }
  }

  private addDataToRequesterNormal(keyRequest, keyComponent): void {
    this.addDataToRequester(keyRequest, this[keyComponent]);
    this[keyComponent] = '';
  }

  addEntryFieldWithFormControl(event, keyRequest, keyControl): void {
    if (event.key === 'Enter') {
      this.addDataToRequesterFilteredFields(keyRequest, keyControl);
    }
  }

  addEntryClickFiltered(toBlurId, keyRequest, keyControl): void {
    document.getElementById(toBlurId).blur();
    this.addDataToRequesterFilteredFields(keyRequest, keyControl);
  }

  private addDataToRequesterFilteredFields(keyRequest, keyControl): void {
    this.addDataToRequester(keyRequest, this[keyControl].value);
    this[keyControl].setValue('');
  }

  private addDataToRequester(keyRequest, value): void {
    if (value !== '' && !this.request[keyRequest].includes(value)) {
      this.request[keyRequest].push(value);
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
    this.childInit = false;
    this.location.replaceState('/research', '');
    this.request.setPage(1);
    this.setTitle();
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

  private setTitle() {
    this.titleService.setTitle('Claims Search');
  }
}
