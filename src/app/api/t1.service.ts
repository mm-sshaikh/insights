import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class T1Service {

  config: any;

  constructor(
    private _http: HttpClient,
    private _config: ConfigService
  ) {
    this.config = this._config.getConfig();
  }

  getOrganizations() {
    const query = 'organizations';
    let self = this;

    self.checkCount(query).then(function (count) {
      if (count) {
        let promises = self.buildPaginated(count, query);
        forkJoin(promises).subscribe(res => {
          let results = [];
          res.forEach((item) => {
            results = results.concat(item.entities.entity);
          });
        });
      }
    });

  }

  private checkCount (query) {
    const url = this.config.base+query;
    let count;
    return this._http.get(url).toPromise().then(function(data) {
      if (data['entities']) {
        count = data['entities']['count'];
      } else {
        count = 1;
      }
      return count;
    });
  }

  private buildPaginated (count, query) {
    let arr = [];
    let base = this.config.base + query;
    let seperator = query.indexOf('?') > 0 ? '&' : '?';

    arr.push(this._http.get(base));

    if (count > 100) {
      for (let i=100; i < count; i += 100) {
        let url = base + seperator + 'page_limit=' + 100 + '&page_offset=' + i;
        arr.push(this._http.get(url));
      }
    }

    return arr;
  }

}
