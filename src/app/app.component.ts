import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FirstRunPage, MainPage } from '../pages/pages';

import { SettingsProvider } from '../providers/settings-provider';

@Component({
   template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any;

  constructor( private platform: Platform, 
               private statusBar : StatusBar,
               private splashScreen : SplashScreen,
               private settingsProvider : SettingsProvider) {
    this.platform.ready().then(() => {
      settingsProvider.isIntroShown().then((introShown) => {
          if(introShown){
            this.enterMainApp();
          } else {
            this.enterIntroduction();
          }
        }).catch(err => {
          console.error("Could not determine if we're running for the first time. " + JSON.stringify(err));
          this.enterIntroduction();
        });
    });
  }

  enterIntroduction() {
    this.rootPage = FirstRunPage;
    this.startApp();
  }

  enterMainApp() {
    this.rootPage = MainPage;
    this.startApp();
  }

  startApp() {
    if(this.platform.is('cordova')) {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
  }
}
