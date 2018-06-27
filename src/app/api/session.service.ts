import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private location = window.location;

  public _config = {
    session: null,
    base: null,
    org: null
  };

  constructor(private _http: HttpClient) { }

  load () {
    if (location['id']) {
      window.document.cookie = 'adama_session='+location['session_id'];
      window.document.cookie = 'apiBase='+location['api_base'];
      window.document.cookie = 'orgId='+location['org_id'];
      this._config['session'] = location['session_id'];
    } else {
      this._http.get('../../assets/local.json')
        .subscribe (res => {
          window.document.cookie = 'adama_session='+res['session_id'];
          window.document.cookie = 'apiBase='+res['api_base'];
          window.document.cookie = 'orgId='+res['org_id'];
          this._config.session = res['session_id'];
        });
    }
  }

  getConfig () {
    return this._config;
  }
}
