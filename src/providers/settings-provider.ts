import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  constructor(private http: Http, private storage: Storage) {
    console.log("Hello from " + this.constructor.name);
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
