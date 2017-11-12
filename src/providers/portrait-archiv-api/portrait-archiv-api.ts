import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { EnvVariables, ApiConfig } from '../../environment-variables/environment-variables.token';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PortraitArchivApiProvider {

  constructor(private http: Http, @Inject(EnvVariables) private config : ApiConfig) {
  }

  validateVeranstaltungsCode(veranstaltungsCode:string){
    return this.http.get(this.config.checkAccessUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+this.config.apikey)
      .map(res => res.json())
      .catch(err => {
        console.error("API Error. HTTP " + err.status + " - Response " + err._body);
        return Observable.throw(err);
      });
  }

  ladeGalerie(veranstaltungsCode:string){    
    return this.http.get(this.config.loadGalleryUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+this.config.apikey)
      .map(res => res.json())
      .catch(err => {
        console.error("API Error. HTTP " + err.status + " - Response " + err._body);
        return Observable.throw(err);
      });
  }

  ladeBilder(veranstaltungsCode:string, folderName: string){    
    return this.http.get(
        this.config.loadPicturesUrl 
        + '?sort=UPLOAD'
        + '&apikey=' + this.config.apikey
        + '&galerieCode=' + veranstaltungsCode
        + '&folder=' + folderName
        + '&imagesPerPage=20'
        + '&currentPage=1')
      .map(res => res.json())
      .catch(err => {
        console.error("API Error. HTTP " + err.status + " - Response " + err._body);
        return Observable.throw(err);
      });
  }

}
