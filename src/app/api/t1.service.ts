import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';

import { map, filter, catchError, mergeMap } from 'rxjs/operators';

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
    const url = this.config.base + 'organizations';
    return this._http.get(url);
  }

  getRest(count, query) {
    let self = this;
    let api = self.config.base + query;
    let promises = self.buildPaginated(count, api);
    return forkJoin(promises);
  }

  private buildPaginated (count, api) {
    let arr = [];
    let seperator = api.indexOf('?') > 0 ? '&' : '?';

    for (let i=100; i < count; i += 100) {
      let url = api + seperator + 'page_limit=' + 100 + '&page_offset=' + i;
      arr.push(this._http.get(url));
    }

    return arr;
  }

}
