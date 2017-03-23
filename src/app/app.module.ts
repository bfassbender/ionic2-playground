import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { SharePage } from '../pages/share/share';
import { ProgressPage } from '../pages/progress/progress';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { UploadQueue } from '../providers/upload-queue';
import { ConfigProvider } from '../providers/config-provider';

@NgModule({
  declarations: [
    MyApp,
    SharePage,
    ProgressPage,
    SettingsPage,
    TabsPage,
    GalleryPage,
    ProgressBarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SharePage,
    ProgressPage,
    SettingsPage,
    TabsPage,
    GalleryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UploadQueue, ConfigProvider]
})
export class AppModule {}
