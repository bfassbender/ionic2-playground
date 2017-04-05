import { Component } from '@angular/core';
import { NavController, Platform, ModalController} from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { GalleryPage } from '../gallery/gallery';

@Component({
  templateUrl: 'share.html'
})
export class SharePage {

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private gaTracker : GoogleAnalyticsTracker,
               private imagePicker : ImagePicker,
               private modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Share Page");
  }

  openCameraRoll() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 10
      ,width: 3000
      ,height: 3000
      ,quality: 80
    }


    this.imagePicker.getPictures(options).then(
      photo_uris => {
        console.info(this.constructor.name + ":Got " + photo_uris.length + " image uris.");
        if(photo_uris.length > 0) {
          console.info(this.constructor.name + ": Forwarding to Gallery Page...");
          let uploadModal = this.modalCtrl.create(GalleryPage, { "photo_uris" : photo_uris });
          uploadModal.present();
        }
        else {
          console.info(this.constructor.name + ": staying here...");
        }
      },
      err => {
        let logString = this.constructor.name + ": ImagePicker.getPictures failed: " + JSON.stringify(err);
        this.gaTracker.trackException(logString ,false);
        console.error(logString);
      }
    );
  }

}
