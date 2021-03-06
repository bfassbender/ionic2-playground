import { Component } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { SettingsProvider } from '../../providers/settings-provider';
import { PortraitArchivApiProvider } from '../../providers/portrait-archiv-api/portrait-archiv-api';

import { IntroductionPage } from '../introduction/introduction';
import { RegisterForEventPage } from '../register-for-event/register-for-event';
import { AboutPage } from '../about/about';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public settings = undefined;
  public snapshareVersion;
  public eventName;
  public googleAnalyticsActive : boolean;

  constructor( private navCtrl: NavController, 
               private gaTracker : GoogleAnalyticsTracker,
               private settingsProvider : SettingsProvider,
               private appCtrl: App,
               private platform: Platform,
               private appVersion: AppVersion,
               private api: PortraitArchivApiProvider
               ) {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {                 
        this.appVersion.getVersionNumber().then(version => {
          this.snapshareVersion = version;
        });
      }
    });
  }

  ionViewWillEnter() {
    this.googleAnalyticsActive = this.gaTracker.isTracking();

    this.settingsProvider.loadSettings().then(settings => {
      if(settings) {
        console.debug(this.constructor.name + ": Current settings - " + JSON.stringify(settings));
        this.settings = settings;

        this.api.ladeGalerie(settings.eventCode).subscribe(galleryData => {
          this.eventName = galleryData.galerie.title;
        });
      }
      else {
        console.info("No settings found in storage");
      }
    });
  }

  toggleGoogleAnalytics() {
    if(this.googleAnalyticsActive) {
      this.gaTracker.enableTracking();
    }
    else {
      this.gaTracker.disableTracking(); 
    }    
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Settings Page");
  }

  changeEvent() {
    this.navCtrl.push(RegisterForEventPage);
  }

  rewatchIntro() {
    this.settingsProvider.setIntroShown(false);
    this.appCtrl.getRootNav().setRoot(IntroductionPage);
  }

  about() {
    this.navCtrl.push(AboutPage);
  }
}
