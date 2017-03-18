import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

  constructor(public navCtrl: NavController, private platform: Platform) {
  }

    ionViewDidEnter() {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackView("Progress Page").catch(err => {
        console.error("Uh-oh... " + JSON.stringify(err));
      });        
    });
    console.info("ProgressPage: ionViewDidEnter");
  }

}
