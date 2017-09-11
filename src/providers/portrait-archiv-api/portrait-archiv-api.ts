import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { EnvVariables, ApiConfig } from '../../environment-variables/environment-variables.token';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PortraitArchivApiProvider {

  constructor(private http: Http, @Inject(EnvVariables) private config : ApiConfig) {
  }

  validateVeranstaltungsCode(veranstaltungsCode:String){
    return this.http.get(this.config.checkAccessUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+this.config.apikey)
      .map(res => res.json())
      .catch(err => {
        console.error("API Error. HTTP " + err.status + " - Response " + err._body);
        return Observable.throw(err);
      });
  }

  ladeGalerie(veranstaltungsCode:String){    
    return this.http.get(this.config.loadGalleryUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+this.config.apikey)
      .map(res => res.json())
      .catch(err => {
        console.error("API Error. HTTP " + err.status + " - Response " + err._body);
        return Observable.throw(err);
      });
  }

}
