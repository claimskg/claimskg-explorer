import { Component } from '@angular/core';
import {Requester} from '../models/Requester';
import {OnInit} from '@angular/core';
import {ClaimsSparqlService} from './claims-sparql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'claimskg-explorer';
  request = new Requester();

  constructor(private claimsSparql: ClaimsSparqlService) {}

  ngOnInit(): void {
    this.request.author = 'Donald Trump';
    this.request.firstDate = '2012-01-01';
    this.request.secondDate = '2019-12-30';
    this.request.languages.push('English');
    // this.request.languages.push('Spanish');
    // this.request.entities.push('Donald Trump');
    // this.request.entities.push('Barack Obama');
    this.request.truthRatings.push(1);
    // this.request.truthRatings.push(2);
    this.claimsSparql.getClaimsPreview(this.request).subscribe(claims => console.log(claims));
  }
}
