import { Component, NgZone} from '@angular/core';
import { NavController, NavParams, Platform, ToastController, Toast} from 'ionic-angular';
import { Transfer, FileUploadOptions, FileUploadResult, FileTransferError, TransferObject } from '@ionic-native/transfer';

import 'rxjs/add/operator/toPromise';

import { ConfigProvider } from '../../providers/config-provider';
import { ApiConfig } from '../../models/api-config';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { SettingsProvider } from '../../providers/settings-provider';

import { SharePage } from '../share/share';

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



  

  constructor(private platform: Platform, 
              private navCtrl: NavController, 
              private navParams: NavParams, 
              private configProvider: ConfigProvider, 
              private transfer: Transfer, 
              private ngZone: NgZone, 
              private toastCtrl: ToastController, 
              private gaTracker : GoogleAnalyticsTracker,
              private settingsProvider : SettingsProvider){

    this.photo_uris = navParams.get("photo_uris");

    if(!this.photo_uris || this.photo_uris.length == 0) {
      this.sendToast("Du hast keine Bilder zum hochladen ausgewählt.");
      this.state_uploading = false;
      return;
    }

    this.total_to_upload = this.photo_uris.length;
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

    let uploadOptionsPromise = this.fileUploadOptionsWithDefaultValues(fileEnding);
    let configPromise = this.configProvider.getApiConfig().toPromise(); 

    Promise.all([uploadOptionsPromise, configPromise]).then(values => {
      console.info("Using the following parameters for upload: " + JSON.stringify(values[0]));
      
      const fileTransfer: TransferObject = this.configureFileTransfer();
      
      fileTransfer.upload(photo_uri, encodeURI(values[1].uploadUrl) , values[0])
      .then((result: FileUploadResult) => {
        this.success(result); 
      }).catch((error: FileTransferError) => {
        this.failed(error);
      }); 
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
      this.navCtrl.setRoot(SharePage).then(() => {
        this.sendToast("Deine Fotos wurden hochgeladen.");
      });
    }
  }

  private failed (err: FileTransferError) : void {
    let logString = "Upload failed for file " + err.source + ". " + JSON.stringify(err);
    console.error(logString);
    this.gaTracker.trackException(logString ,false);
    this.sendToast("Konnte Deine Fotos leider nicht hochladen: " + err.code + ", Status Code: " + err.http_status);
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

  private fileUploadOptionsWithDefaultValues(fileEnding : string = '.jpg') : Promise<FileUploadOptions> {
    let settingsPromise = this.settingsProvider.load();
    let configPromise = this.configProvider.getApiConfig().toPromise();

    let resultPromise : Promise<FileUploadOptions> = Promise.all([settingsPromise, configPromise]).then(values => {
      let userSettings : any = values[0];
      let appConfig : ApiConfig = values[1];
      let subFolder = appConfig.subFolder;

      if(userSettings.userName) {
        subFolder = subFolder + " - " + userSettings.userName;
      }

      return <FileUploadOptions> {
        params : {
          "apikey" : appConfig.apikey,
          "galerieCode" : userSettings.veranstaltungsCode,
          "subFolder" : subFolder
        },
        fileName: this.generateUuid() + fileEnding
      }
    }).catch((err) => {
      throw new Error("Could not initiate upload: " + err);
    });

    return resultPromise;
  }

  private sendToast(message: string) {
    let toast : Toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
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