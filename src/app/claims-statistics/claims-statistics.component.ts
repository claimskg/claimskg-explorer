import { Component, OnInit } from '@angular/core';
import {StatClaim} from '../../models/utils/StatClaim';
import {UtilsDataSparqlService} from '../utils-data-sparql.service';

@Component({
  selector: 'app-claims-statistics',
  templateUrl: './claims-statistics.component.html',
  styleUrls: ['./claims-statistics.component.css']
})
export class ClaimsStatisticsComponent implements OnInit {

  stats: StatClaim[];

  constructor(private utilsService: UtilsDataSparqlService) { }

  ngOnInit() {
    this.getStats();
  }

  private getStats() {
    this.utilsService.getClaimsStatistics().subscribe(res => this.stats = res);
  }

}
