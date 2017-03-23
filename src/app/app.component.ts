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
               private splashScreen : SplashScreen,
               private ga: GoogleAnalytics) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      configProvider.loadApiConfig().subscribe( (apiConfig : ApiConfig) => {
        ga.startTrackerWithId(apiConfig.gaKey)
          .then(() => {
            console.log('Google analytics is ready now');
            ga.setAllowIDFACollection(true);
            ga.setAnonymizeIp(true);
            ga.setAppVersion('0.0.1');
          })
          .catch(e => console.log('Error starting GoogleAnalytics', e)); 
      })
    
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
