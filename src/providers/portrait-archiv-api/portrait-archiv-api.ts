import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ConfigProvider } from '../config-provider'

@Injectable()
export class PortraitArchivApiProvider {

  constructor(private http: Http, private config: ConfigProvider) {
    console.log('Hello PortraitArchivApiProvider Provider');
  }

  validateVeranstaltungsCode(veranstaltungsCode:String){
    return this.config.getApiConfig().flatMap(res => {
      return this.http.get(res.checkAccessUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+res.apikey)
        .map(res => res.json());
    });
  }

}
