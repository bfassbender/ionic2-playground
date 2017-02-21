import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiConfig } from './api-config';

@Injectable()
export class ConfigProvider {

  private apiConfig: ApiConfig;

  constructor(public http: Http) { }

  loadApiConfig() : void {
    this.http.get('assets/config/api-params.json')
      .map(res => res.json() as ApiConfig)
      .subscribe(config => {
        this.apiConfig = config;
        console.log('API Config loaded');
    });
  }

  getApiConfig() : ApiConfig {
    return this.apiConfig;
  }
}
