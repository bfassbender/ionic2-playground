import { Component } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { SettingsProvider } from '../../providers/settings-provider';

import { IntroductionPage } from '../introduction/introduction';
import { RegisterForEventPage } from '../register-for-event/register-for-event';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public settings;

  constructor( private navCtrl: NavController, 
               private gaTracker : GoogleAnalyticsTracker,
               private settingsProvider : SettingsProvider,
               public appCtrl: App
               ) {
  }

  ionViewWillEnter() {
    this.settingsProvider.loadSettings().then(settings => {
      if(settings) {
        console.debug(this.constructor.name + ": Current settings - " + JSON.stringify(settings));
        this.settings = settings;
      }
      else {
        console.info("No settings found in storage");
      }
    });
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Settings Page");
  }

  changeEvent() {
    this.navCtrl.push(RegisterForEventPage);
  }

  rewatchIntro() {
    this.settingsProvider.setIntroShown(false);
    this.appCtrl.getRootNav().setRoot(IntroductionPage);
  }

}
