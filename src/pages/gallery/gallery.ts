import { Component, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Transfer, FileUploadOptions, File } from 'ionic-native';


declare var cordova: any;

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {

  fileSystem:string = cordova.file.applicationDirectory;

  uploadProgress: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone) {
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
  }

  uploadPhoto() {
    const transfer = new Transfer();
    var options: FileUploadOptions;
    
    options = {
      fileName : "ErsterVersuch.jpg",
      params : {
        //access params go here
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
      //this.navParams.get("images")[0]
      //this.fileSystem + "www/assets/img/portrait-sample.jpg"
      .upload(this.navParams.get("images")[0], "https://www.portrait-archiv.com/rest/uploadService/uploadToFolder", options)
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