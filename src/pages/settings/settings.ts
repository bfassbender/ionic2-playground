import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NavController, Platform} from 'ionic-angular';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settingsForm: FormGroup;

  constructor( public navCtrl: NavController, 
               private platform: Platform,
               private gaTracker : GoogleAnalyticsTracker,
               private formBuilder: FormBuilder ) {
    this.settingsForm = this.formBuilder.group({
      veranstaltungsCode: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }



  saveSettings() {
    console.log(this.settingsForm.value)
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Settings Page");
    console.debug(this.constructor.name + ": ionViewDidEnter");
  }
}
