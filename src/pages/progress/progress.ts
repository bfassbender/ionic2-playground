import { Component } from '@angular/core';

import { NavController, Platform} from 'ionic-angular';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private gaTracker : GoogleAnalyticsTracker) {
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Progress Page");
    console.debug("ProgressPage: ionViewDidEnter");
  }

}
