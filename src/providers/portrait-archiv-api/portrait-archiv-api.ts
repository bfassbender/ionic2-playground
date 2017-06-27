import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigProvider } from '../config-provider'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PortraitArchivApiProvider {

  constructor(private http: Http, private config: ConfigProvider) {
    console.log('Hello PortraitArchivApiProvider Provider');
  }

  validateVeranstaltungsCode(veranstaltungsCode:String){
    return this.config.getApiConfig().flatMap(res => {
      return this.http.get(res.checkAccessUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+res.apikey)
        .map(res => res.json())
        .catch(err => {
          console.error(err);
          return Observable.throw(err);
        });
    });
  }

}
