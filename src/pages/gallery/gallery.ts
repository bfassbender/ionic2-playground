import { Component, NgZone} from '@angular/core';
import { NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import { Transfer, FileUploadOptions, FileUploadResult, FileTransferError, TransferObject } from '@ionic-native/transfer';

import { ConfigProvider } from '../../providers/config-provider';
import { ApiConfig } from '../../models/api-config';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';

import { SharePage } from '../share/share';

declare var cordova: any;

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {
  
  uploadProgress: number = 0;
  state_uploading: boolean = true;

  current_photo_index: number = 1;
  total_to_upload: number;
  
  photo_uris: Array<string>;

  private apiConfig: ApiConfig;

  

  constructor(
      private platform: Platform, 
      private navCtrl: NavController, 
      private navParams: NavParams, 
      private configProvider: ConfigProvider, 
      private transfer: Transfer, 
      private ngZone: NgZone, 
      private alertCtrl: AlertController, 
      private gaTracker : GoogleAnalyticsTracker) {
    this.photo_uris = navParams.get("photo_uris");
    if(!this.photo_uris || this.photo_uris.length == 0) {
      this.alertUser("Error", "No images selected to be uploaded.");
      this.state_uploading = false;
      return;
    }

    this.total_to_upload = this.photo_uris.length;
    this.apiConfig = this.configProvider.getApiConfig();

    console.log("Hello from GalleryPage constructor!");
  }

  ionViewDidLoad() {
    console.debug("GalleryPage: ionViewDidLoad");
    if(this.photo_uris.length > 0) {
      this.configureFileTransfer()
      this.uploadPhoto(this.photo_uris[this.current_photo_index - 1]);
    }
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Upload Page");
    console.debug("GalleryPage: ionViewDidEnter");
  }

  private uploadPhoto(photo_uri: string) : void {
    console.info("GalleryPage uploading image: " + photo_uri);

    let fileEnding = photo_uri.substring(photo_uri.lastIndexOf('.'));
    let uploadOptions = this.fileUploadOptionsWithDefaultValues(fileEnding);

    console.info("Using the following parameters for upload: " + JSON.stringify(uploadOptions));
    
    const fileTransfer: TransferObject = this.configureFileTransfer();
    fileTransfer.upload(photo_uri, encodeURI(this.apiConfig.url) , uploadOptions)
      .then((result: FileUploadResult) => {
        this.success(result); 
      }).catch((error: FileTransferError) => {
        this.failed(error);
      }); 
  }

  private success(result: FileUploadResult) : void {
    console.info("GalleryPage upload successful. " + JSON.stringify(result));

    this.gaTracker.trackEvent("Photo", "upload successful", result.response , result.bytesSent);
    if(this.current_photo_index < this.total_to_upload) {             
      this.current_photo_index++;
      this.uploadProgress = 0;                    
      this.uploadPhoto(this.photo_uris[this.current_photo_index - 1]);
    } else {
      this.state_uploading = false;
      console.info("GalleryPage upload completed. Uploaded " + this.total_to_upload + " images.");
      this.gaTracker.trackEvent("Photoset", "upload finished", "" , this.total_to_upload);
    }
  }

  private failed (err: FileTransferError) : void {
    let logString = "Upload failed for file " + err.source + ". " + JSON.stringify(err);
    console.error(logString);
    this.gaTracker.trackException(logString ,false);
    this.alertUser("Upload failed", "Could not upload Image to Server. Error Code: " + err.code + ", Status Code: " + err.http_status);
    this.uploadProgress = 0;
    this.state_uploading = false;
  }

  private configureFileTransfer() : TransferObject {
    let transferObject = this.transfer.create();
    transferObject.onProgress((progressEvent: ProgressEvent) => {
      this.ngZone.run(() => {
        if(progressEvent.lengthComputable) {
          let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.debug("Upload progress: " + progress + "%");
          this.uploadProgress = progress;
        }
      });
    });
    return transferObject;
  }

  private fileUploadOptionsWithDefaultValues(fileEnding : string = '.jpg') : FileUploadOptions{
    return {
      params : {
        "apikey" : this.apiConfig.apikey,
        "galerieCode" : this.apiConfig.galerieCode,
        "subFolder" : this.apiConfig.subFolder
      },
      fileName: this.generateUuid() + fileEnding,
    };
  }

  private alertUser(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // Relies on Math.random(). If better randomness needed, switch to e.g. node_uuid
  private generateUuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  done () : void  {
    this.navCtrl.setRoot(SharePage);    
  }
}