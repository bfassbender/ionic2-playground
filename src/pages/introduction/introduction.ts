import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { MainPage } from '../pages';

import { SettingsProvider } from '../../providers/settings-provider';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';

@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html'
})
export class IntroductionPage {

  showSkip = true;

  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private settingsProv: SettingsProvider, 
    private gaTracker: GoogleAnalyticsTracker
  ) { }

  startApp() {
    this.navCtrl.setRoot(MainPage).then(() => {
      this.settingsProv.setIntroShown(true);
    });
  }

  onSlideChangeStart(slides: Slides) {
    this.showSkip = !slides.isEnd();
  }
	
  ionViewWillEnter() {
		this.slides.update();
	}

  ionViewDidEnter() {
    this.gaTracker.trackView("Introduction Page");
  }
}
