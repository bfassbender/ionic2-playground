import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadQueue {

  private fileUrls : Array<String> = [];
  // private dictionary :  { [id: string]: IUploadItem; } = {};

  constructor() {
    console.log('Hello PhotoBuffer Provider');
  }

  public addPictureUrl(url: String) {
    if(url != null && url != undefined && url.length > 0) {
      this.fileUrls.push(url);
    }
  }
 
  public getNextPictureUrl() : String {
    if (this.fileUrls.length < 1) {
      return undefined;
    }
    else {
      return this.fileUrls[0];
    }
  }

  public removePictureUrl(url : String) {
    var index = this.fileUrls.indexOf(url, 0);
    if (index > -1) {
      this.fileUrls.splice(index, 1);
    }
  }

  public getPendingUploads() : number {
    return this.fileUrls.length;
  }

}

// interface IUploadItem {
//    localFileUrl: string;
//    uploadStatus: string;
// }
