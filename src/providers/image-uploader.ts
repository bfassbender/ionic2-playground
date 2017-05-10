import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class ImageUploader {

  constructor() {
  }

  uploadImages(imageUrls: Array<string>) : Observable<any> {

    return Observable.create((observer: Observer<string>) => {
      imageUrls.forEach(url => observer.next(url));
      observer.complete();
    });

  }

}
