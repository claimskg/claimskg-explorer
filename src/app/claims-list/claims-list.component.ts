import {Component, OnInit, Input, SimpleChanges, SimpleChange} from '@angular/core';
import {Requester} from '../../models/Requester';
import {ClaimsSparqlService} from '../claims-sparql.service';
import {ClaimPreview} from '../../models/ClaimPreview';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {Title} from '@angular/platform-browser';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit{

  @Input() request: Requester;

  claims: ClaimPreview[];

  claimsCount: number;

  loadingCounter = true;

  loadingClaims = true;

  noResult = false;

  endResults = false;

  selectedClaimId: string;

  claimOpen = false;

  pageIndex: number;

  pageIndexForPaginator: number;

  constructor(private sparqlService: ClaimsSparqlService, private router: Router, private location: Location, private titleService: Title) {
    this.pageIndex = 1;
    this.pageIndexForPaginator = 0;
  }

  ngOnInit() {
    this.getRequestClaims();
    this.getCountClaims();
    this.setTitle();
  }

  getRequestClaims(): void {
    this.sparqlService.getClaimsPreview(this.request).subscribe(claims => this.diffuseClaims(claims));
  }

  getCountClaims(): void {
    this.sparqlService.getClaimsPreviewCount(this.request).subscribe(claimsCount => this.diffuseClaimsCount(claimsCount));
  }

  diffuseClaims(claims: ClaimPreview[]): void {
    this.loadingClaims = false;
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
  diffuseClaimsCount(count): void {
    this.claimsCount = count;
    this.loadingCounter = false;
  }

  pageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex + 1;
    this.jumpPage();
  }

  loadNewData(): void {
    this.loadingClaims = true;
    this.claims = [];
    this.getRequestClaims();
    window.scroll(0, 0);
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

  getNbMaxPages(): number {

    return parseInt(((this.claimsCount / this.request.getLimit()) + 1).toString(), null);
  }

  jumpPage() {
    if (this.pageIndex > this.getNbMaxPages()) {
      this.pageIndex = this.getNbMaxPages();
    }
    if (this.pageIndex < 1) {
      this.pageIndex = 1;
    }
    this.request.setPage(this.pageIndex);
    this.pageIndexForPaginator = this.pageIndex - 1;
    this.loadNewData();
  }
}
