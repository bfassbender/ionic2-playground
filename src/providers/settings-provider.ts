import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  constructor(private storage: Storage) { }

  saveSettings(settings: Object) {
    this.storage.set("eventSettings", settings).then(() => {
      console.debug(this.constructor.name + ": Saved " + JSON.stringify(settings));
    });
  }
  

  loadSettings() : Promise<any> {
    return this.storage.get("eventSettings");
  }

  isIntroShown() : Promise<boolean> {
    return this.storage.get("introShown").then(data => {
      console.info(this.constructor.name + ": introShown from storage is " + data);
      return data;
    });
  }

  isSettingsCompleted() : Promise<boolean> {
    return this.storage.get("eventSettings").then(eventSettings => {
      console.debug(this.constructor.name + ": Loaded from storage - " + JSON.stringify(eventSettings));
      return eventSettings.eventCode && eventSettings.userName;
    });
  }

  setIntroShown(introShown: boolean) {
    this.storage.set("introShown", introShown).then(() => {
      console.info(this.constructor.name + ": Saved 'introShown' with value '" + JSON.stringify(introShown)+"'");
    });
  }
}
