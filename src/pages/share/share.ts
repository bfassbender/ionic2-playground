import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private gaTracker : GoogleAnalyticsTracker,
               private imagePicker : ImagePicker) {
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Share Page");
    console.debug(this.constructor.name + ": ionViewDidEnter");
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
        console.info(this.constructor.name + ": Got " + photo_uris.length + " image uris. Forwarding to Gallery Page...");
        this.navCtrl.setRoot(GalleryPage, { "photo_uris" : photo_uris });
      },
      err => {
        let logString = "ImagePicker.getPictures failed: " + JSON.stringify(err);
        this.gaTracker.trackException(logString ,false);
        console.error(this.constructor.name + ": " + logString);
      }
    );
  }

}
