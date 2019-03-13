import {Component, OnInit, Input, SimpleChanges, SimpleChange} from '@angular/core';
import {Requester} from '../../models/Requester';
import {ClaimsSparqlService} from '../claims-sparql.service';
import {ClaimPreview} from '../../models/ClaimPreview';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit{

  @Input() request: Requester;

  claims: ClaimPreview[];

  pagesIndex: number[];

  noResult = false;

  endResults = false;

  selectedClaimId: string;

  claimOpen = false;

  constructor(private sparqlService: ClaimsSparqlService, private router: Router, private location: Location, private titleService: Title) {
    this.pagesIndex = [1, 2];
  }

  ngOnInit() {
    this.getRequestClaims();
    this.setTitle();
  }

  getRequestClaims(): void {
    this.sparqlService.getClaimsPreview(this.request).subscribe(claims => this.diffuseClaims(claims));
  }

  diffuseClaims(claims: ClaimPreview[]): void {
    if (!(claims.length === 0)) {
        this.claims = claims;
        this.noResult = false;
        this.endResults = false;
    } else if (this.request.getCurrentPageIndex() > 1) {
        this.endResults = true;
    } else {
        this.noResult = true;
        this.titleService.setTitle('No results');
    }
  }

  clickNext(): void {
    this.request.incrementOffset();
    this.checkPageIndexWhenIncrement();
    this.loadNewData();
  }

  clickPrevious(): void {
    if (this.request.getCurrentPageIndex() > 1) {
      this.request.decrementOffset();
      this.checkPageIndexOnDecrement();
      this.loadNewData();    }
  }

  loadNewData(): void {
    this.claims = [];
    this.getRequestClaims();
    window.scroll(0, 0);
  }

  checkPageIndexWhenIncrement(): void {
    const page = this.request.getCurrentPageIndex();
    if (page === this.pagesIndex[1]) {
      this.pagesIndex = [page, page + 1];
    }
  }

  checkPageIndexOnDecrement(): void {
    const page = this.request.getCurrentPageIndex();
    if (!(page === this.pagesIndex[0]) && this.pagesIndex[0] !== 1) {
      this.pagesIndex = [page, page + 1];
    }
  }

  loadPage(page: number): void {
    const previousIndex = this.request.getCurrentPageIndex();
    this.request.setPage(page);
    if (page < previousIndex) {
      this.checkPageIndexOnDecrement();
    }
    if (page > previousIndex) {
      this.checkPageIndexWhenIncrement();
    }
    this.loadNewData();
  }

  openClaim(id: string) {
    this.selectedClaimId = id;
    this.claimOpen = true;
    this.location.replaceState('/detail/' + id, '');
  }

  goBackList() {
    this.claimOpen = false;
    // Plus tard dans le projet, il faudra changer query par les paramtres de la recherche etc..
    this.location.replaceState('/research', '');
    this.setTitle();
  }

  private setTitle() {
    this.titleService.setTitle('Claims Search');
  }
}
