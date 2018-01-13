import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeStyle } from '@angular/platform-browser';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { GalleryPage } from '../gallery/gallery';
import { PortraitArchivApiProvider } from '../../providers/portrait-archiv-api/portrait-archiv-api'
import { SettingsProvider } from '../../providers/settings-provider'

@Component({
  selector: 'page-share',
  templateUrl: 'share.html' 
})
export class SharePage {

  public eventName: string;
  public imageUrlStyles: SafeStyle[];

  public userName: string;
  public eventCode: string;
  
  constructor( public navCtrl: NavController, 
               private gaTracker : GoogleAnalyticsTracker,
               private imagePicker : ImagePicker,
               private modalCtrl: ModalController,
               private api: PortraitArchivApiProvider,
               private settings: SettingsProvider,
               private platform: Platform,
               private sanitizer: DomSanitizer
              ) {
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Share Page");
  }

  ionViewWillEnter() {
    if(!this.settingsLoadedAlready()) {
      this.settings.loadSettings().then(userSettings => {
        if(userSettings != null) {
          console.debug(userSettings);
          this.userName = userSettings.userName;
          this.eventCode = userSettings.eventCode;
          this.api.ladeGalerie(userSettings.eventCode).subscribe(galleryData => {
            this.eventName = galleryData.galerie.title;
          });
          this.ladeBilder(this.eventCode, this.userName);
        }
      })
    }
    else {
      this.ladeBilder(this.eventCode, this.userName);
    }
  }

  private ladeBilder(_eventCode: string, _userName: string) {
    console.log("Lade Bilder...");
    this.api.ladeBilder(_eventCode, _userName).subscribe(imageListResult => {
      let imagesList = imageListResult.images;
      this.escapeBlanksInBaseUrls(imagesList);
      this.imageUrlStyles = [];
      for (let image of imagesList) {
        let unsafeImageUrl = "background-image: url('" + image.baseUrl + '/' + image.detailUrl + "')";
        let safeImageUrl = this.sanitizer.bypassSecurityTrustStyle(unsafeImageUrl);
        this.imageUrlStyles.push(safeImageUrl);
      }
    })
  }

  private escapeBlanksInBaseUrls(imageArray: any[]) {
    for (let image of imageArray) {
      let dirtyBaseUrl = image.baseUrl;
      let cleanedBaseUrl = dirtyBaseUrl.replace(/ /g,"%20");
      image.baseUrl = cleanedBaseUrl;
    }
  }

  private settingsLoadedAlready() : boolean {
    return (this.eventCode != null && this.eventName != null && this.userName != null);
  }

  openCameraRoll() {
    //I do not use the ImagePickerOptions Type here, as the "title" attribute is not defined there.
    let options = {
      maximumImagesCount: 10
      ,title: "Bilderauswahl"
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
