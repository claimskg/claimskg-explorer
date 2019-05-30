import {Component, OnInit, Input, SimpleChanges, SimpleChange} from '@angular/core';
import {Requester} from '../../models/Requester';
import {ClaimsSparqlService} from '../claims-sparql.service';
import {ClaimPreview} from '../../models/ClaimPreview';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Title} from '@angular/platform-browser';
import {MatDialog, PageEvent} from '@angular/material';
import {ClaimsExportModalComponent} from '../claims-export-modal/claims-export-modal.component';
import {ResultCount} from '../../models/utils/ResultCount';

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit {

  @Input() request: Requester;

  claims: ClaimPreview[];

  claimsCount: number;

  claimsCounter: ResultCount;

  loadingCounter = true;

  loadingClaims = true;

  noResult = false;

  endResults = false;

  selectedClaimId: string;

  claimOpen = false;

  pageIndex: number;

  pageIndexForPaginator: number;

  constructor(private sparqlService: ClaimsSparqlService, private route: ActivatedRoute, private router: Router,
              private location: Location, private titleService: Title, public dialog: MatDialog) {
    this.setUpReloadComponentOnRouterLink();
  }

  // Make reload the list component on router link click if routerlink points on the same component
  private setUpReloadComponentOnRouterLink() {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    this.pageIndex = 1;
    this.pageIndexForPaginator = 0;
  }

  ngOnInit() {
    this.initFromRoute();
    this.updateQueryToSearch();
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
    } else {
        this.noResult = true;
        this.titleService.setTitle('No results');
    }
  }
  diffuseClaimsCount(count: ResultCount): void {
    this.claimsCount = count.getTotal();
    this.claimsCounter = count;
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
    this.updateQueryToSearch();
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
    this.updateQueryToSearch();
    this.loadNewData();
  }

  private updateQueryToSearch() {
    this.location.replaceState('/search', this.request.toQueryParams());
  }

  private initFromRoute() {
    this.route
      .queryParams
      .subscribe(params => {
        if (!this.request) {
          this.request = new Requester();
          this.request.configureWithQueyParams(params);
          const page = params.page;
          if (page !== undefined) {
            this.pageIndex = parseInt(page, null);
            if (this.pageIndex < 1) {
              this.pageIndex = 1;
            }
            this.pageIndexForPaginator = this.pageIndex - 1;
            this.request.setPage(this.pageIndex);
          }
        }
      });
  }

  enterPageJump($event) {
    if ($event.key === 'Enter') {
      document.getElementById($event.target.id).blur();
      this.jumpPage();
    }
  }

  openExport() {
    this.dialog.open(ClaimsExportModalComponent, {
      data: this.request,
    });
  }

  getFilterLinkByRating(rating: number) {
    const savedTruth = this.request.truthRatings;
    const savedOffset = this.request.currentOffset;
    this.request.truthRatings = [];
    this.request.truthRatings.push(rating);
    this.request.setPage(1);
    const query =  this.request.toQueryParams();
    this.request.truthRatings = savedTruth;
    this.request.currentOffset = savedOffset;

    return 'search' + query;
  }
}
