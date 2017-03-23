import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private ga : GoogleAnalytics) {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.ga.trackView("Progress Page").catch(err => {
        console.error("GA Tracking failed: " + JSON.stringify(err));
      });        
    });
    console.debug("ProgressPage: ionViewDidEnter");
  }

}
