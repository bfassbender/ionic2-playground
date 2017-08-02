import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams, TextInput } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createVeranstaltungsCodeValidator } from '../../validators/gallery-code-validator';
import { PortraitArchivApiProvider } from '../../providers/portrait-archiv-api/portrait-archiv-api';

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
  

  constructor(navCtrl: NavController, navParams: NavParams, formBuilder: FormBuilder, private apiProvider: PortraitArchivApiProvider) {
    this.eventCodeForm = formBuilder.group({
      veranstaltungsCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}-[0-9]{4}-[0-9]{4}')]), createVeranstaltungsCodeValidator(apiProvider,this)],
    });

    this.userNameForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')], )]
    });

  }

   ngOnInit() {
    
    this.eventCodeForm.statusChanges
        .debounceTime(400)
        .subscribe(status => {
          if(status === 'VALID') {
            this.apiProvider.ladeGalerie(this.eventCodeForm.value.veranstaltungsCode).subscribe(data => {
              this.eventName = data.galerie.title;
              this.eventCodeInput.setBlur();
              this.next();
            })
          }
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterForEventPage');
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
        console.log("success!")
        console.log(this.eventCodeForm.value);
        console.log(this.userNameForm.value);
    }
  }

}
