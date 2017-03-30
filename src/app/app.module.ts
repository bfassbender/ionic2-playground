import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer } from '@ionic-native/transfer';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SharePage } from '../pages/share/share';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { UploadQueue } from '../providers/upload-queue';
import { ConfigProvider } from '../providers/config-provider';
import { GoogleAnalyticsTracker } from '../providers/google-analytics-tracker';
import { SettingsProvider } from '../providers/settings-provider';



let appDeclarations = [
  MyApp,
  SharePage,
  SettingsPage,
  TabsPage,
  GalleryPage,
  ProgressBarComponent
];

let appImports = [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name:'_snapshareStorage'
    })
];

let appEntryComponents = [
  MyApp,
  SharePage,
  SettingsPage,
  TabsPage,
  GalleryPage
];

let appProviders = [
  {provide: ErrorHandler, useClass: IonicErrorHandler}, 
  StatusBar,
  SplashScreen,
  ImagePicker,
  Transfer,
  GoogleAnalytics,
  UploadQueue, 
  ConfigProvider,
  GoogleAnalyticsTracker,
  SettingsProvider
];

@NgModule({
  declarations: appDeclarations,
  imports: appImports,
  bootstrap: [IonicApp],
  entryComponents: appEntryComponents,
  providers: appProviders
})
export class AppModule {}
