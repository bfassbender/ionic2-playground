import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PhotoUploader provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhotoUploader {

  private pendingUploads = 3;

  constructor(public http: Http) {
    console.log('Hello PhotoUploader Provider');
  }

  getPendingUploads() {
    return this.pendingUploads;
  }

}
