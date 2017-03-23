import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private ga : GoogleAnalytics,
               private imagePicker : ImagePicker) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.ga.trackView("Share Page").catch(err => {
        console.error("GA Tracking failed: " + JSON.stringify(err));
      });        
    });
    console.debug("ProgressPage: ionViewDidEnter");
  }

  openCameraRoll() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 10
      ,width: 3000
      ,height: 3000
      ,quality: 85
    }


    this.imagePicker.getPictures(options).then(
      photo_uris => {
        console.log("SharePage: Got " + photo_uris.length + " image uris. Forwarding to Gallery Page...");
        this.navCtrl.setRoot(GalleryPage, { "photo_uris" : photo_uris });
      },
      err => {
        let logString = "ImagePicker.getPictures failed: " + JSON.stringify(err);
        this.ga.trackException(logString ,false).catch(err => { console.error("GA Tracking failed: " + JSON.stringify(err))});
        console.log(logString);
      }
    );
  }

}
