import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  base: string = 'https://t1qa10.mediamath.com/api/v2.0/';
  org: string = '100278';

  public getConfig () {
    let config = {};
    let location = window.location;
    if (location['api_base']) {
      config['base'] = location['api_base'];
      config['org'] = location['org_id'];
    } else {
      config['base'] = this.base;
      config['org'] = this.org;
    }
    return config;
  }

}
