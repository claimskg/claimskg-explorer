import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-claims-home',
  templateUrl: './claims-home.component.html',
  styleUrls: ['./claims-home.component.css']
})
export class ClaimsHomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Claims Explorer');
  }

}
