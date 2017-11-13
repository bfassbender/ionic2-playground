import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EnvVariables, ApiConfig } from '../../environment-variables/environment-variables.token';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PortraitArchivApiProvider {

  constructor(private http: HttpClient, @Inject(EnvVariables) private config : ApiConfig) {
  }

  validateVeranstaltungsCode(veranstaltungsCode:string){
    return this.http.get(this.config.checkAccessUrl+'?apikey='+this.config.apikey+'&galerieCode='+veranstaltungsCode)
      .catch((err : HttpErrorResponse) => {
        this.logError(err); 
        return Observable.throw(err);
      });
  }

  ladeGalerie(veranstaltungsCode:string){    
    return this.http.get(this.config.loadGalleryUrl+'?galerieCode='+veranstaltungsCode+'&apikey='+this.config.apikey)
      .catch((err : HttpErrorResponse) => {
          this.logError(err); 
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
      .catch((err : HttpErrorResponse) => {
        this.logError(err); 
        return Observable.throw(err);
      });
  }

  logError(err : HttpErrorResponse) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.warn('A client-side error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.warn(`Server returned code ${err.status}, body was: ${err.error}`);
    }
  }

}
