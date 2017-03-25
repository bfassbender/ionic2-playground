import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  constructor(private http: Http, private storage: Storage) {
    console.log("Hello from " + this.constructor.name)
    storage.ready().then(() => {

       // set a key/value
       storage.set('age', 47);

       // Or to get a key/value pair
       storage.get('age').then((val) => {
         console.log('Your age is', val);
      })
    });
  }

  save(settings: Object) {
    this.storage.set("eventSettings", settings).then(() => {
      console.debug(this.constructor.name + ": Saved " + JSON.stringify(settings));
    });
  }

  load() : Promise<any> {
    return this.storage.get("eventSettings");
  }

}
