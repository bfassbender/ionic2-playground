import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private ga : GoogleAnalytics) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.ga.trackView("Settings Page").catch(err => {
        console.error("GA Tracking failed: " + JSON.stringify(err));
      });        
    });
    console.debug("ProgressPage: ionViewDidEnter");
  }

}
