import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer } from '@ionic-native/transfer';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { UploadQueue } from '../providers/upload-queue';
import { ConfigProvider } from '../providers/config-provider';
import { GoogleAnalyticsTracker } from '../providers/google-analytics-tracker';
import { SettingsProvider } from '../providers/settings-provider';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { SharePage } from '../pages/share/share';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';
import { IntroductionPage } from '../pages/introduction/introduction';


let pages = [
  MyApp,
  SharePage,
  SettingsPage,
  TabsPage,
  GalleryPage,
  IntroductionPage
];

let comps = [
  ProgressBarComponent
];

let providers = [
  StatusBar,
  SplashScreen,
  ImagePicker,
  Transfer,
  GoogleAnalytics,
  UploadQueue, 
  ConfigProvider,
  GoogleAnalyticsTracker,
  SettingsProvider,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
];

export function pageDeclarations() {
  return pages;
}

export function compDeclarations() {
  return comps;
}

export function providerDeclarations() {
  return providers;
}

@NgModule({
  declarations: [ 
    pageDeclarations(),
    compDeclarations()
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot({
      name:'_snapshareStorage'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: pageDeclarations(),
  providers: providerDeclarations()
})
export class AppModule {}
