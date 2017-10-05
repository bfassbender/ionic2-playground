import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';
import { File } from '@ionic-native/file';

import { EnvironmentsModule } from '../environment-variables/environment-variables.module';
import { GoogleAnalyticsTracker } from '../providers/google-analytics-tracker';
import { SettingsProvider } from '../providers/settings-provider';
import { PortraitArchivApiProvider } from '../providers/portrait-archiv-api/portrait-archiv-api';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { SharePage } from '../pages/share/share';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';
import { IntroductionPage } from '../pages/introduction/introduction';
import { RegisterForEventPage } from '../pages/register-for-event/register-for-event'
import { AboutPage } from '../pages/about/about'


let pages = [
  MyApp,
  SharePage,
  SettingsPage,
  TabsPage,
  GalleryPage,
  IntroductionPage,
  RegisterForEventPage,
  AboutPage
];

let comps = [
  ProgressBarComponent
];

let providers = [
  StatusBar,
  SplashScreen,
  ImagePicker,
  FileTransfer,
  File,
  GoogleAnalytics,
  AppVersion,
  PortraitArchivApiProvider,
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
    }),
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: pageDeclarations(),
  providers: providerDeclarations()
})
export class AppModule {}
