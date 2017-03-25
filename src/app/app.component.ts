import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { TabsPage } from '../pages/tabs/tabs';

import { ConfigProvider } from '../providers/config-provider';
import { ApiConfig } from '../models/api-config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor( private platform: Platform, 
               private configProvider: ConfigProvider,
               private statusBar : StatusBar,
               private splashScreen : SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
