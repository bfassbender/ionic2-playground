import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { SharePage } from '../share/share';
import { ProgressPage } from '../progress/progress';
import { UploadQueue } from '../../providers/upload-queue';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SettingsPage;
  tab2Root: any = ProgressPage;
  tab3Root: any = SharePage;

  constructor(private uploadQueue : UploadQueue) {

  }

  getPendingUploads () {
    return this.uploadQueue.getPendingUploads() || "";
  }
}
