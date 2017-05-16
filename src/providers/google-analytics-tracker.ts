import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { ConfigProvider } from './config-provider';
import { ApiConfig } from '../models/api-config';

@Injectable()
export class GoogleAnalyticsTracker {

  constructor(private platform: Platform, private ga: GoogleAnalytics, private configProvider: ConfigProvider) {
    platform.ready().then(() => {
      if(platform.is('cordova')) {
        configProvider.getApiConfig().subscribe( (apiConfig : ApiConfig) => {
          ga.startTrackerWithId(apiConfig.gaKey)
            .then(() => {
              console.log('Google analytics is ready now');
              ga.setAllowIDFACollection(true);
              ga.setAnonymizeIp(true);
              ga.setAppVersion('0.0.3');
              ga.enableUncaughtExceptionReporting(true);
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e)); 
        });
      }      
    });
  }

  trackView(title: string){
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        this.ga.trackView(title).catch(err => {
          console.warn("GA trackView failed for view [" + title + "]: " + JSON.stringify(err));
        });        
      }
    });
  }

  trackEvent(category: string, action: string, label: string, value: number){
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        this.ga.trackEvent(category, action, label, value).catch(err => {
          console.warn("GA trackEvent failed for Event [" + category + ", "+ action + "]: " + JSON.stringify(err));
        });        
      }
    });
  }

  trackException(description: string, fatal: boolean){
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        this.ga.trackException(description, fatal).catch(err => {
          console.warn("GA trackView failed for Exception [" + description + "]: " + JSON.stringify(err));
        });        
      }
    });
  }
}
