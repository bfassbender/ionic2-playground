import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SharePage } from '../pages/share/share';
import { ProgressPage } from '../pages/progress/progress';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { UploadQueue } from '../providers/upload-queue';
import { ConfigProvider } from '../providers/config-provider';
import { GoogleAnalytics} from '@ionic-native/google-analytics';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer } from '@ionic-native/transfer';


let appDeclarations = [
  MyApp,
  SharePage,
  ProgressPage,
  SettingsPage,
  TabsPage,
  GalleryPage,
  ProgressBarComponent
];

let appImports = [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
];

let appEntryComponents = [
  MyApp,
  SharePage,
  ProgressPage,
  SettingsPage,
  TabsPage,
  GalleryPage
];

let appProviders = [
  {provide: ErrorHandler, useClass: IonicErrorHandler}, 
  StatusBar,
  SplashScreen,
  GoogleAnalytics,
  ImagePicker,
  Transfer,
  UploadQueue, 
  ConfigProvider
];

@NgModule({
  declarations: appDeclarations,
  imports: appImports,
  bootstrap: [IonicApp],
  entryComponents: appEntryComponents,
  providers: appProviders
})
export class AppModule {}
