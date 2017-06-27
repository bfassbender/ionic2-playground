import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { Transfer, FileUploadOptions, FileUploadResult, FileTransferError, TransferObject } from '@ionic-native/transfer';

@Injectable()
export class ImageUploader {

  constructor(private transfer: Transfer) {
  }

  uploadImages(imageUrls: Array<string>) : Observable<any> {
    return Observable.from(imageUrls);
  }

  doReactiveStuff() {
    let obs = Observable.range(1,20);
    obs.map(elem => elem * elem).subscribe(elem => console.log(elem));
  }

}
