import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class T1Service {

  constructor( private _http: HttpClient ) { }

  getOrganizations() {
    const url = 'https://t1qa10.mediamath.com/api/v2.0/organizations';
    return this._http.get(url);
  }
}
