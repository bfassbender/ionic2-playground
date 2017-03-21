import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ApiConfig } from '../models/api-config';

@Injectable()
export class ConfigProvider {

  apiConfig : ApiConfig;

  constructor(public http: Http) {}

  loadApiConfig() : Observable<ApiConfig> {
    return this.http.get('assets/config/api-params.json')
      .map(res => {
        let config : ApiConfig = res.json() as ApiConfig;
        this.apiConfig = config;
        console.log("Config loaded: " + JSON.stringify(this.apiConfig));
        return config;
      }
    );
  }

  public getApiConfig() : ApiConfig {
    if( this.apiConfig ) {
      return this.apiConfig;
    }
    else {
      this.loadApiConfig().subscribe(config => {
        return config;
      })
    }
  }
}
