import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NavController, Platform, ViewController } from 'ionic-angular';
import { GoogleAnalyticsTracker} from '../../providers/google-analytics-tracker';
import { SettingsProvider } from '../../providers/settings-provider';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settingsForm: FormGroup;

  isReadyToSave: boolean;

  constructor( public navCtrl: NavController, 
               private viewCtrl: ViewController,
               private platform: Platform,
               private gaTracker : GoogleAnalyticsTracker,
               private settingsProvider : SettingsProvider,
               private formBuilder: FormBuilder ) {
    
    this.settingsForm = this.formBuilder.group({
      veranstaltungsCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}-[0-9]{4}')])],
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')], )]
    });
  }

  saveSettings() {
    console.log(this.settingsForm.value);
    this.settingsProvider.save(this.settingsForm.value);
  }

  ionViewWillEnter() {
    this.settingsProvider.load().then(settings => {
      if(settings) {
        console.info(this.constructor.name + ": Loaded settings from storage - " + JSON.stringify(settings));
        this.settingsForm.setValue(settings);
      }
      else {
        console.info("No settings found in storage");
      }

      // Watch the form for changes, and
      this.settingsForm.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.settingsForm.valid;
      });
    });
  }

  ionViewDidEnter() {
    this.gaTracker.trackView("Settings Page");
    console.debug(this.constructor.name + ": ionViewDidEnter");
  }

  
}
