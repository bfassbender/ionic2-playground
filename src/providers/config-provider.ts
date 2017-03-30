import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { ApiConfig } from '../models/api-config';

@Injectable()
export class ConfigProvider {

  private apiConfigCache : Observable<ApiConfig>;

  constructor(public http: Http) {}

  public getApiConfig() : Observable<ApiConfig> {
    if(!this.apiConfigCache){
      this.apiConfigCache = this.http.get('assets/config/api-params.json')
                          .map(res => res.json() as ApiConfig)
                          .do(config => console.info(this.constructor.name + ' - Retrieved config ' + JSON.stringify(config)))
                          .publishReplay(1)
                          .refCount();
    }
    return this.apiConfigCache;
  }
}
