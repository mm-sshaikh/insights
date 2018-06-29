import { Component, OnInit } from '@angular/core';

import { T1Service } from './api/t1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Brain Insights';
  organizations: any;

  constructor (private t1Service: T1Service) {}

  ngOnInit() {
    this.getOrgs();
  }

  getOrgs() {
    let self = this;
    let orgs = [];
    self.t1Service.getOrganizations().subscribe(init => {
      if (init['entities']) {
        let entities = init['entities'];
        let count = entities['count'];
        orgs = orgs.concat(entities['entity']);
        if (count > 100) {
          self.t1Service.getRest(entities['count'], 'organizations').subscribe(rest => {
            rest.forEach((org) => {
              orgs = orgs.concat(org['entities']['entity']);
            });
            self.organizations = orgs;
          })
        }
      }
    })
  }

}
