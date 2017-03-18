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
      GoogleAnalytics.trackView("Share Page").catch(err => { console.error("GA Tracking failed: " + JSON.stringify(err))});        
    });
    console.debug("SharePage: ionViewDidEnter");
  }

  openCameraRoll() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 20
      //,width: 3000
      //,height: 3000
      //,quality: 75
    }


    ImagePicker.getPictures(options).then(
      photo_uris => {
        console.log("SharePage: Got image uris. Forwarding to Gallery Page...");
        this.navCtrl.setRoot(GalleryPage, { "photo_uris" : photo_uris });
      },
      err => {
        let logString = "ImagePicker.getPictures failed: " + JSON.stringify(err);
        GoogleAnalytics.trackException(logString ,false).catch(err => { console.error("GA Tracking failed: " + JSON.stringify(err))});
        console.log(logString);
      }
    );
  }

}
