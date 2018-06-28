import { Component, OnInit } from '@angular/core';

import { T1Service } from './api/t1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Brain Insights';

  constructor (private t1Service: T1Service) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.t1Service.getOrganizations();
  }
}
