import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FirstRunPage, MainPage } from '../pages/pages';

import { SettingsProvider } from '../providers/settings-provider';

@Component({
   template: '<ion-nav [root]="rootPage" swipeBackEnabled="false" #nav></ion-nav>'
})
export class MyApp {
  rootPage: any;
  @ViewChild('nav') public nav: Nav;

  constructor( private platform: Platform, 
               private statusBar : StatusBar,
               private splashScreen : SplashScreen,
               private settingsProvider : SettingsProvider) {

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
  }

  enterIntroduction() {
    this.rootPage = FirstRunPage;
    this.nav.setRoot(this.rootPage).then(() => this.startApp());
  }

  enterMainApp() {
    this.rootPage = MainPage;
    this.nav.setRoot(this.rootPage).then(() => this.startApp());
  }

  startApp() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        setTimeout(() => {
          this.splashScreen.hide();
        }, 200);
      }
    });
  }
}
