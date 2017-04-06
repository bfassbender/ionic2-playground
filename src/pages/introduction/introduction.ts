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
        title: "Teile Deine Schnappschüsse im Portraitarchiv",
        description: "Mit Snapshare kannst Du Deine Fotos einfach und bequem direkt von Deinem Smartphone auf <a href='https://www.portrait-archiv.com'>portrait-archiv.com</a> teilen.",
        image: '',
      },
      {
        title: "Name und Veranstaltungscode eingeben und loslegen",
        description: "Durch eingabe des Veranstaltungscodes landen Deine Fotos direkt in der richtigen Galerie. Die Bilder werden unter Deinem Namen abgelegt und sind so einfach zu finden.",
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
