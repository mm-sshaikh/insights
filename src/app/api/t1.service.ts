import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class T1Service {

  private _config: any;

  constructor(
    private _http: HttpClient,
    private _session: SessionService
  ) { }

  getOrganizations() {
    const url = 'https://t1qa10.mediamath.com/api/v2.0/organizations';
    return this._http.get(url, { withCredentials: true });
  }
}
