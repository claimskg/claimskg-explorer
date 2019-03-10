import { Component } from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'claimskg-explorer';

  constructor() {}

  ngOnInit(): void {

  }
}
