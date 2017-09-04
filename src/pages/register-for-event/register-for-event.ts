import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams, TextInput, App} from 'ionic-angular';
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

  @ViewChild('signupSlider') signupSlider: Slides;
  @ViewChild('eventCode') eventCodeInput: TextInput;

  submitAttempt = false;
  eventCodeForm: FormGroup;
  userNameForm: FormGroup;

  eventName: String;

  settings: any;
  

  constructor(
      navCtrl: NavController, 
      navParams: NavParams, 
      formBuilder: FormBuilder, 
      private apiProvider: PortraitArchivApiProvider, 
      private settingsProvider : SettingsProvider,
      public appCtrl: App) {
    this.eventCodeForm = formBuilder.group({
      eventCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}-[0-9]{4}')]), createVeranstaltungsCodeValidator(apiProvider,this)],
    });

    this.userNameForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')], )]
    });

  }

  ngOnInit() {

    this.settingsProvider.loadSettings().then(settings => {
      if(settings) {
        console.info(this.constructor.name + ": Current settings - " + JSON.stringify(settings));
        this.settings = settings;
        this.eventCodeForm.get('eventCode').setValue(this.settings.eventCode,{emitEvent:false});
        this.userNameForm.get('userName').setValue(this.settings.userName,{emitEvent:false});
      }
      else {
        console.info("No settings found in storage");
      }
    });

    this.eventCodeForm.statusChanges
        .debounceTime(400)
        .subscribe(status => {
          if(status === 'VALID') {
            this.apiProvider.ladeGalerie(this.eventCodeForm.value.eventCode).subscribe(data => {
              this.eventName = data.galerie.title;
              this.eventCodeInput.setBlur();
              this.next();
            })
          }
        });
  }

  next() {
    this.signupSlider.slideNext();
  }
 
  prev() {
    this.signupSlider.slidePrev();
  }
 
  save() {
    this.submitAttempt = true;
 
    if(!this.eventCodeForm.valid){
      this.signupSlider.slideTo(0);
    } 
    else if(!this.userNameForm.valid){
      this.signupSlider.slideTo(1);
    }
    else {
        this.settingsProvider.saveSettings({
          "userName" : this.userNameForm.value.userName,
          "eventCode" : this.eventCodeForm.value.eventCode
        });
        this.finishWorkflow();
    }
  }

  private finishWorkflow() {
    this.appCtrl.getRootNav().setRoot(TabsPage);
  }

}
