import { Component, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Transfer, FileUploadOptions, File } from 'ionic-native';

import { ConfigProvider } from '../../providers/config-provider';
import { ApiConfig } from '../../providers/api-config';


declare var cordova: any;

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  apiConfig: ApiConfig;
  fileSystem:string = cordova.file.applicationDirectory;
  uploadProgress: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public configProvider: ConfigProvider, private ngZone: NgZone) {
    console.log('constructor GalleryPage');
    
    File.checkDir(this.fileSystem, 'www/assets/img')
      .then(
        (success) => {
          console.log("Directory Exists!" + success)
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
    this.apiConfig = this.configProvider.getApiConfig();
    console.log("ApiConfig assigned");
    console.log(this.apiConfig);
  }

  uploadPhoto() {
    const transfer = new Transfer();
    var options: FileUploadOptions;
    
    options = {
      fileName : "ErsterVersuch.jpg",
      params : {
        "apikey" : this.apiConfig.apikey,
        "galerieCode" : this.apiConfig.galerieCode,
        "subFolder" : this.apiConfig.subFolder
      }
    };

    transfer.onProgress((progressEvent: ProgressEvent) => {
      this.ngZone.run(() => {
        if(progressEvent.lengthComputable) {
          let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log("Progress: " + progress + "%");
          this.uploadProgress = progress;
        }
      });
    });

    transfer
      .upload(this.navParams.get("images")[0], encodeURI(this.apiConfig.url) , options)
      .then(
          (data) => {
            console.log(data);
            alert("Upload successful! Yay!");
          },
          (err) => {
            console.log(err);
            alert("Upload failed :(");
          }
      );
  }

}