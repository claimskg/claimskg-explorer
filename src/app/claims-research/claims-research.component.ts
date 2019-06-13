import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Requester} from '../../models/Requester';
import {Language} from '../../models/utils/Language';
import {Organization} from '../../models/utils/Organization';
import {UtilsDataSparqlService} from '../utils-data-sparql.service';
import {ClaimsListComponent} from '../claims-list/claims-list.component';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';
import {ClaimsHelpModalComponent} from '../claims-help-modal/claims-help-modal.component';
import {Utils} from '../../models/utils/Utils';
import {BsDatepickerConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-claims-research',
  templateUrl: './claims-research.component.html',
  styleUrls: ['./claims-research.component.css']
})
export class ClaimsResearchComponent implements OnInit, AfterViewInit {

  request: Requester;
  go = false;
  entitiesField: string;
  languagesField: string;
  sourcesField: string;
  keywordsField: string;
  authorField: string;
  allLanguages: Language[];
  allSources: Organization[];
  filteredEntities: string[];
  filteredAuthors: string[];
  filteredLanguages: Language[];
  filteredSources: Organization[];
  @ViewChild(ClaimsListComponent) resultList: ClaimsListComponent;
  @ViewChildren(ClaimsListComponent) initDetector: QueryList<ClaimsListComponent>;
  childInit = false;
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private utilsDataService: UtilsDataSparqlService, private titleService: Title,
              private location: Location, public dialog: MatDialog) {}

  ngOnInit() {
    this.request = new Requester();
    this.filteredLanguages = [];
    this.filteredSources = [];
    this.filteredEntities = [];
    this.filteredEntities = [];
    this.utilsDataService.getAllLanguages().subscribe(languages => this.setUpFilterLanguages(languages));
    this.utilsDataService.getAllSources().subscribe(sources => this.setUpFilterSources(sources));
    this.setTitle();
    this.bsConfig = Object.assign({}, { showWeekNumbers: false, rangeInputFormat: 'DD/MM/YYYY' });
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

  addEntryFilterPress(event, keyRequest, keyComponent, keyFilter, clear, blur) {
    if (event.key === 'Enter') {
      this.addEntryFilter(keyRequest, keyComponent, keyFilter, clear, blur, event.target.id);
    }
  }

  addEntryFilterClick(keyRequest, keyComponent, keyFilter, clear, blur, blurID = null) {
    this.addEntryFilter(keyRequest, keyComponent, keyFilter, clear, blur, blurID);
  }

  private addEntryFilter(keyRequest, keyComponent, keyFilter, clear, blur, blurId) {
    this.addDataToRequesterNormal(keyRequest, keyComponent);
    if (clear) {
      this[keyFilter] = [];
    }
    if (blur && blurId !== null) {
      document.getElementById(blurId).blur();
    }
  }

  private addDataToRequesterNormal(keyRequest, keyComponent): void {
    if (this[keyComponent] !== '' && !this.request[keyRequest].map(str => str.toLowerCase()).includes(this[keyComponent].toLowerCase())) {
      this.request[keyRequest].push(this[keyComponent]);
    }
    this[keyComponent] = '';
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

  orderBy($event, value) {
    if ($event.target.checked === true) {
      this.request.orderBy = value;
    }
  }

  howToOrder($event, value) {
    if ($event.target.checked === true) {
      this.request.howToOrder = value;
    }
  }

  goBackForm() {
    this.go = false;
    this.childInit = false;
    this.location.replaceState('/research', '');
    this.request.setPage(1);
    this.setTitle();
  }

  private setUpFilterLanguages(languages): void {
    this.allLanguages = languages;
    this.filteredLanguages = this.allLanguages;
  }

  private setUpFilterSources(sources): void {
    this.allSources = sources;
    this.filteredSources = this.allSources;
  }

  searchEntities(term: string): void {
    this.filteredEntities = [];
    if (term.length >= 3) {
      this.utilsDataService.getFilteredEntities(term).subscribe(res => this.filteredEntities = res);
    }
  }

  searchAuthors(term: string) {
    this.filteredAuthors = [];
    if (term.length >= 3) {
      this.utilsDataService.getFilteredAuthors(term).subscribe(res => this.filteredAuthors = res);
    }
  }

  searchLanguages(term: string): void {
    const filterValue = term.toLowerCase();
    this.filteredLanguages =  this.allLanguages.filter(language => language.name.toLowerCase().includes(filterValue));
  }

  searchSources(term: string): void {
    const filterValue = term.toLowerCase();
    this.filteredSources =  this.allSources.filter(source => source.name.toLowerCase().includes(filterValue));
  }

  private setTitle() {
    this.titleService.setTitle('Claims Search');
  }

  openDialogEntities() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.entitiesModalData
    });
  }

  openDialogEntitiesMentionedInArticles() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.entitiesMentionsFromArticleModalData
    });
  }

  openDialogEntitiesConjunction() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.entitiesConjuctionModalData
    });
  }

  openDialogKeywords() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.keywordsModalData
    });
  }

  openDialogKeywordsConjunction() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.keywordsConjuctionModalData
    });
  }

  openDialogLanguages() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.languagesModalData
    });
  }

  openDialogSources() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.sourcesModalData
    });
  }

  openDialogAuthors() {
    this.dialog.open(ClaimsHelpModalComponent, {
      data: Utils.authorsModalData
    });
  }

  changePrecision($event) {
    this.request.entitiesSearchIncludeArticles = $event.target.checked;
  }
}
