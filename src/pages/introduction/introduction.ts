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
        title: "<b>Teile Deine Schnappschüsse</b> im Portraitarchiv",
        description: "Mit Snapshare kannst Du Deine Fotos einfach und bequem direkt von Deinem Smartphone auf <a href='https://www.portrait-archiv.com'>portrait-archiv.com</a> teilen.",
        image: 'assets/img/intro_slide_1.png',
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
