import { Component } from '@angular/core';

import { NavController, App, ToastController, Toast } from 'ionic-angular';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { SettingsProvider } from '../../providers/settings-provider';
import { PortraitArchivApiProvider } from '../../providers/portrait-archiv-api/portrait-archiv-api';

import { IntroductionPage } from '../introduction/introduction';
import { RegisterForEventPage } from '../register-for-event/register-for-event';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public settings;

  constructor( public navCtrl: NavController, 
               private gaTracker : GoogleAnalyticsTracker,
               private settingsProvider : SettingsProvider,
               apiProvider: PortraitArchivApiProvider,
               public appCtrl: App,
               private toastCtrl: ToastController ) {
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

  private sendToast(message: string, error?:boolean) {
    let cssClass = "toast-success";
    if(error) {
      cssClass = "toast-danger"
    }

    let toast : Toast = this.toastCtrl.create({
      message: message,
      position: "top",
      duration: 2000,
      showCloseButton: true,
      cssClass: cssClass
    });
    toast.present();
  }
}
