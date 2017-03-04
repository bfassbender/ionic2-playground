import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from 'ionic-native';

import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor(private navCtrl: NavController) {

  }

  openCameraRoll() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 10
      //,width: 3000
      //,height: 3000
      //,quality: 90
    }


    ImagePicker.getPictures(options).then(
      photo_uris => {
        console.log("SharePage: Got image uris. Forwarding to Gallery Page...");
        this.navCtrl.setRoot(GalleryPage, { "photo_uris" : photo_uris });
      },
      err => {
        console.log("Uh oh", err);
      }
    );
  }

}
