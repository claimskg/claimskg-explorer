import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-claim-help',
  templateUrl: './claim-help.component.html',
  styleUrls: ['./claim-help.component.css']
})
export class ClaimHelpComponent implements OnInit {

  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
  }

}
