import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { FileTransfer, FileUploadOptions, FileUploadResult, FileTransferError, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ImageUploader {

  constructor(private transfer: FileTransfer) {
  }

  uploadImages(imageUrls: Array<string>) : Observable<any> {
    return Observable.from(imageUrls);
  }

  doReactiveStuff() {
    let obs = Observable.range(1,20);
    obs.map(elem => elem * elem).subscribe(elem => console.log(elem));
  }

}
