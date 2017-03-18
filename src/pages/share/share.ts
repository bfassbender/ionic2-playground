import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { ImagePicker, ImagePickerOptions, GoogleAnalytics } from 'ionic-native';

import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor(public navCtrl: NavController, private platform: Platform) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Share Page").catch(err => {
        console.error("Uh-oh... " + JSON.stringify(err));
      });        
    });
    console.info("SharePage: ionViewDidEnter");
  }

  openCameraRoll() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 10
      ,width: 3000
      ,height: 3000
      ,quality: 75
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
