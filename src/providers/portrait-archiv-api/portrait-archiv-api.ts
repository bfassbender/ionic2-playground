import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigProvider } from '../config-provider'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PortraitArchivApiProvider {

  constructor(private http: Http, private config: ConfigProvider) {
  }

  validateVeranstaltungsCode(veranstaltungsCode:String){
    return this.config.getApiConfig().switchMap(res => {
      return this.http.get(res.checkAccessUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+res.apikey)
        .map(res => res.json())
        .catch(err => {
          console.error("API Error. HTTP " + err.status + " - Response " + err._body);
          return Observable.throw(err);
        });
    });
  }

  ladeGalerie(veranstaltungsCode:String){
    return this.config.getApiConfig().switchMap(res => {
      return this.http.get(res.loadGalleryUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+res.apikey)
        .map(res => res.json())
        .catch(err => {
          console.error("API Error. HTTP " + err.status + " - Response " + err._body);
          return Observable.throw(err);
        });
    });
  }

}
