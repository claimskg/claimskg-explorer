import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UtilsDataSparqlService} from '../utils-data-sparql.service';

@Component({
  selector: 'app-claims-home',
  templateUrl: './claims-home.component.html',
  styleUrls: ['./claims-home.component.css']
})
export class ClaimsHomeComponent implements OnInit {

  claimsCount = 0;

  constructor(private titleService: Title, private utilsService: UtilsDataSparqlService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Claims Explorer');
    this.utilsService.getClaimsTotalCount().subscribe(count => this.triggerCounter(count));
  }

  triggerCounter(total) {
    this.animateCounter(total, 1000);
  }

  animateCounter(end, duration) {
    const range = end - 0;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;
    const current = this;

    function run() {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - (remaining * range));
      current.claimsCount = value;
      if (value === end) {
        clearInterval(timer);
      }
    }

    timer = setInterval(run, stepTime);
    run();
  }

}
