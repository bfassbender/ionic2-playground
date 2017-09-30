import { Component, NgZone, Inject} from '@angular/core';
import { NavParams, ToastController, Toast, ViewController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileUploadResult, FileTransferError, FileTransferObject } from '@ionic-native/file-transfer';

import 'rxjs/add/operator/toPromise';

import { EnvVariables, ApiConfig } from '../../environment-variables/environment-variables.token';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { SettingsProvider } from '../../providers/settings-provider';

@Component({
  templateUrl: 'gallery.html'
})
export class GalleryPage {
  
  uploadProgress: number = 0;
  state_uploading: boolean = true;

  current_photo_index: number = 1;
  total_to_upload: number;
  
  photo_uris: Array<string>;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams, 
              @Inject(EnvVariables) private config: ApiConfig, 
              private transfer: FileTransfer, 
              private ngZone: NgZone, 
              private toastCtrl: ToastController, 
              private gaTracker : GoogleAnalyticsTracker,
              private settingsProvider : SettingsProvider){
    
    this.photo_uris = this.navParams.get("photo_uris");

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

    uploadOptionsPromise.then(options => {      
      const fileTransfer: FileTransferObject = this.configureFileTransfer();
      
      fileTransfer.upload(photo_uri, encodeURI(this.config.uploadUrl) , options)
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
      this.closePage().then(() => {
        this.sendToast("Deine Fotos wurden hochgeladen.");
      });
    }
  }

  private failed (err: FileTransferError) : void {
    let logString = "Upload failed for file " + err.source + ". " + JSON.stringify(err);
    console.error(logString);
    this.gaTracker.trackException(logString ,false);
   
    this.uploadProgress = 0;
    this.state_uploading = false;
    this.closePage().then(() => {
      this.sendToast("Konnte Deine Fotos leider nicht hochladen. Fehlercode: " + err.code, true);
    });
  }

  private configureFileTransfer() : FileTransferObject {
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
    let settingsPromise = this.settingsProvider.loadSettings();

    let resultPromise : Promise<FileUploadOptions> = settingsPromise.then(values => {
      let userSettings : any = values;
      let subFolder = this.config.defaultSubFolder;

      if(userSettings.userName) {
        subFolder = userSettings.userName;
      }

      return <FileUploadOptions> {
        params : {
          "apikey" : this.config.apikey,
          "galerieCode" : userSettings.eventCode,
          "subFolder" : subFolder
        },
        fileName: this.generateUuid() + fileEnding
      }
    }).catch((err) => {
      throw new Error("Could not initiate upload: " + err);
    });

    return resultPromise;
  }

  private sendToast(message: string, error?:boolean) {
    let cssClass = "toast-success";
    if(error) {
      cssClass = "toast-danger"
    }

    let toast : Toast = this.toastCtrl.create({
      message: message,
      position: "middle",
      duration: 3000,
      showCloseButton: true,
      cssClass: cssClass
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

  closePage () : Promise<any>  {
    return this.viewCtrl.dismiss();    
  }
}