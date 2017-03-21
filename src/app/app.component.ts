import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, GoogleAnalytics } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { ConfigProvider } from '../providers/config-provider';
import { ApiConfig } from '../models/api-config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, configProvider: ConfigProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      configProvider.loadApiConfig().subscribe( (apiConfig : ApiConfig) => {
        GoogleAnalytics.startTrackerWithId(apiConfig.gaKey)
          .then(() => {
            console.log('Google analytics is ready now');
            GoogleAnalytics.setAllowIDFACollection(true);
            //GoogleAnalytics.setAnonymizeIp(true);
            GoogleAnalytics.setAppVersion('0.0.1');
          })
          .catch(e => console.log('Error starting GoogleAnalytics', e)); 
      })
    
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
