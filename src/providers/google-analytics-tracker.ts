import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';

import { EnvVariables, ApiConfig } from '../environment-variables/environment-variables.token';
import { SettingsProvider} from '../providers/settings-provider';

@Injectable()
export class GoogleAnalyticsTracker {

  private userOptedOut : boolean = true;
  private appVersion : string;

  constructor(private platform: Platform, private ga: GoogleAnalytics, @Inject(EnvVariables) private config: ApiConfig, appVersion: AppVersion, private settings: SettingsProvider) {
    platform.ready().then(() => {

      settings.isGoogleAnalyticsOptOut().then(storedOptOutValue => {
        this.userOptedOut = storedOptOutValue;

        if(platform.is('cordova')) {
          appVersion.getVersionNumber().then(version => {
            console.info("Application Version: " + version);
            this.appVersion = version;
            this.startTracker(this.userOptedOut);
          }).catch(e => console.log('Error starting GoogleAnalytics', e)); 
        }
      });
    });
  }

  startTracker(optOut: boolean) {
    this.ga.startTrackerWithId(this.config.gaKey)
    .then(() => {
      this.ga.setAllowIDFACollection(false);
      this.ga.setAnonymizeIp(true);
      this.ga.setAppVersion(this.appVersion);
      this.ga.enableUncaughtExceptionReporting(true);
      this.ga.setOptOut(optOut);
      console.log('Google analytics tracker started');
      if(optOut) {
        console.log('Google analytics OPT-OUT ACTIVE!');
      }
    });
  }

  trackView(title: string){
    if(this.userOptedOut) {
      return;
    }

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

  disableTracking() {
    return this.toggleTracking(true);
  }

  enableTracking() {
    return this.toggleTracking(false);
  }

  private toggleTracking(optOut: boolean) {
    return this.settings.setGoogleAnalyticsOptOut(optOut).then(() => {
      if(this.platform.is('cordova')) {
        this.ga.setOptOut(optOut).then(() => {
          this.userOptedOut = optOut;
          if(this.userOptedOut) {
            console.info("Google Analytics DEACTIVATED!");
          }
          else {
            console.info("Google Analytics ACTIVATED!");
          }
        });
      } 
      else {
        this.fakeGoogleAnalytics(optOut);
      }
    }); 
  }

  private fakeGoogleAnalytics(optOut: boolean) {
    this.userOptedOut = optOut;
    if(this.userOptedOut) {
      console.info("Fake: Google Analytics Tracking DEACTIVATED (Cordova not available)");
    }
    else {
      console.info("Fake: Google Analytics Tracking ACTIVATED (Cordova not available)");
    }
  }

  isTracking() {
    return !this.userOptedOut;
  }
}
