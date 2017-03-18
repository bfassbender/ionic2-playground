import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private platform: Platform) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Settings Page").catch(err => {
        console.error("Uh-oh... " + JSON.stringify(err));
      });        
    });
    console.info("SettingsPage: ionViewDidEnter");
  }

}
