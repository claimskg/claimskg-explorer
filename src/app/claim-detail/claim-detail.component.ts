import {Component, Input, OnInit} from '@angular/core';
import {ClaimsSparqlService} from '../claims-sparql.service';
import {Claim} from '../../models/Claim';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {

  @Input() claimId: string;
  @Input() contentMarginClass = 'margin-t-100';
  claim: Claim;
  notFound = false;
  loading = true;

  constructor(private sparqlService: ClaimsSparqlService, private route: ActivatedRoute,
              private router: Router, private titleService: Title) { }

  ngOnInit() {
    const idRoute = this.route.snapshot.paramMap.get('id');
    if (idRoute !== null) {
      this.claimId = idRoute;
    }
    this.sparqlService.getClaim(this.claimId).subscribe(claim => this.setupClaim(claim));
  }

  private setupClaim(claim: Claim): void {
    this.loading  = false;
    this.claim = claim;
    if (claim === null) {
      this.notFound = true;
      this.titleService.setTitle('Not found');
      return;
    }
    this.titleService.setTitle(this.claim.text);
  }
}
