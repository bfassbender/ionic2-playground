import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { SharePage } from '../share/share';
import { UploadQueue } from '../../providers/upload-queue';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SettingsPage;
  tab2Root: any = SharePage;
  activeTab: number = 1;

  constructor(private uploadQueue : UploadQueue) {

  }

  getPendingUploads () {
    return this.uploadQueue.getPendingUploads() || "";
  }
}
