import { Component } from '@angular/core';
import { NavController, NavParams, App} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createVeranstaltungsCodeValidator } from '../../validators/gallery-code-validator';
import { PortraitArchivApiProvider } from '../../providers/portrait-archiv-api/portrait-archiv-api';
import { SettingsProvider } from '../../providers/settings-provider'
import { TabsPage } from '../tabs/tabs'

@Component({
  selector: 'page-register-for-event',
  templateUrl: 'register-for-event.html',
})
export class RegisterForEventPage {

  submitAttempt = false;
  settingsForm: FormGroup;

  eventName: String;  

  constructor(
      navCtrl: NavController, 
      navParams: NavParams, 
      formBuilder: FormBuilder, 
      private apiProvider: PortraitArchivApiProvider, 
      private settingsProvider : SettingsProvider,
      public appCtrl: App) {
    
    this.settingsForm = formBuilder.group({
      eventCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}-[0-9]{4}')]), createVeranstaltungsCodeValidator(apiProvider,this)],
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')], )]
    });
  }

  ngOnInit() {

    this.settingsProvider.loadSettings().then(settings => {
      if(settings) {
        console.info(this.constructor.name + ": Current settings - " + JSON.stringify(settings));
        this.settingsForm.get('userName').setValue(settings.userName,{emitEvent:true});
      }
      else {
        console.info("No settings found in storage");
      }
    });

    // Watch the form for changes, and load gallery info from API if valid
 
    this.settingsForm.get('eventCode').statusChanges
        .debounceTime(400)
        .subscribe(status => {
          if(status === 'VALID') {
            this.apiProvider.ladeGalerie(this.settingsForm.value.eventCode).subscribe(data => {
              this.eventName = data.galerie.title;
            })
          }
          else {
            this.eventName = undefined;
          }
        });
  }

  private saveSettings() {
    console.log(JSON.stringify(this.settingsForm.value));
    this.settingsProvider.saveSettings(this.settingsForm.value);
  }

  finishWorkflow() {
    this.saveSettings();
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }

}
