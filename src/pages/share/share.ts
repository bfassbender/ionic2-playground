import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';

import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor(private navCtrl: NavController) {

  }

  openCameraRoll() {
    let options = {
      maximumImagesCount: 1,
      width: 1500,
      height: 1500,
      quality: 95
    }

    ImagePicker.getPictures(options).then(
      file_uris => {
        console.log("Got some Images:" + file_uris);
        this.navCtrl.push(GalleryPage, { "images" : file_uris });
      },
      err => {
        console.log("Uh oh", err);
      }
    );
  }

}
