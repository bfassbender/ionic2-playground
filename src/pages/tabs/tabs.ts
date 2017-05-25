import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { SharePage } from '../share/share';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SettingsPage;
  tab2Root: any = SharePage;
  activeTab: number = 1;

  constructor() {

  }

  getPendingUploads () {
    "";
  }
}
