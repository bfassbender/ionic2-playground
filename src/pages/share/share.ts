import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { GalleryPage } from '../gallery/gallery';
import { PortraitArchivApiProvider } from '../../providers/portrait-archiv-api/portrait-archiv-api'
import { SettingsProvider } from '../../providers/settings-provider'

@Component({
  templateUrl: 'share.html'
})
export class SharePage {

  public eventName: String;
  public userName: String;
  public eventCode: String;
  public lastImageUrl: String;

  constructor( public navCtrl: NavController, 
               private gaTracker : GoogleAnalyticsTracker,
               private imagePicker : ImagePicker,
               private modalCtrl: ModalController,
               private api: PortraitArchivApiProvider,
               private settings: SettingsProvider,
               private platform: Platform
              ) {
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Share Page");
  }

  ionViewWillEnter() {
    if(!this.dataLoadedAlready()) {
      this.settings.loadSettings().then(userSettings => {
        if(userSettings != null) {
          console.debug(userSettings);
          this.userName = userSettings.userName;
          this.eventCode = userSettings.eventCode;
          this.api.ladeGalerie(userSettings.eventCode).subscribe(galleryData => {
            this.eventName = galleryData.galerie.title;
            this.lastImageUrl = this.constructImageUrl(galleryData.images);
          });
        }
      })
    }
  }

  private constructImageUrl(imageArray: any[]): String {
    if(imageArray == null || imageArray.length <= 0) {
      return undefined;
    }
    length = imageArray.length;
    let imageUrl = decodeURIComponent(imageArray[length-2].baseUrl).replace(/\+/g,"%20") + "/" + imageArray[length-2].detailUrl;
    console.log(imageUrl);
    return imageUrl;
  }

  private dataLoadedAlready() : boolean {
    return (this.eventCode != null && this.eventName != null && this.userName != null);
  }

  openCameraRoll() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 10
      ,quality: 80
    }

    if(this.platform.is('android')) {
      options.quality = 90;
      console.log("Running on Android, setting image quality to " + options.quality)
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
