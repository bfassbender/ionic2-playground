import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SharePage } from '../pages/share/share';
import { ProgressPage } from '../pages/progress/progress';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';

import { PhotoBuffer } from '../providers/photo-buffer';
import { PhotoUploader } from '../providers/photo-uploader';
import { ConfigProvider } from '../providers/config-provider';

@NgModule({
  declarations: [
    MyApp,
    SharePage,
    ProgressPage,
    SettingsPage,
    TabsPage,
    GalleryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PhotoBuffer, PhotoUploader, ConfigProvider]
})
export class AppModule {}
