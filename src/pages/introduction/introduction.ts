import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { MainPage } from '../pages';
import { RegisterForEventPage } from '../register-for-event/register-for-event'

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
    this.settingsProv.loadSettings().then(settingData => {

      let nextPage: any = MainPage;

      if(!settingData) {
        nextPage = RegisterForEventPage;
      }

      this.navCtrl.setRoot(nextPage).then(() => {
        this.settingsProv.setIntroShown(true);
      });
      
    })
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
