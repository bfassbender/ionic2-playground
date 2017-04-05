import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MainPage } from '../pages';

import { SettingsProvider } from '../../providers/settings-provider';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html'
})
export class IntroductionPage {

  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private settingsProv: SettingsProvider, private gaTracker: GoogleAnalyticsTracker) {
    this.slides = [
      {
        title: "Slide 1",
        description: "Cool Stuff Bro",
        image: '',
      },
      {
        title: "Slide 2",
        description: "Even more stuff",
        image: '',
      },
      {
        title: "Slide 3",
        description: "Almost done...",
        image: '',
      }
    ];
  }

  startApp() {
    this.settingsProv.setIntroShown(true);
    this.navCtrl.setRoot(MainPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Introduction Page");
  }
}
