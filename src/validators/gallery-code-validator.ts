import { FormControl } from '@angular/forms';
import { PortraitArchivApiProvider } from '../providers/portrait-archiv-api/portrait-archiv-api'

export function createVeranstaltungsCodeValidator(api: PortraitArchivApiProvider, component) {
  return function(control:FormControl) {
    return new Promise((resolve,reject) => {
      if(!control.dirty) {
         resolve(null);
      }
      api.validateVeranstaltungsCode(control.value).subscribe(
        data => {
          console.info("VeranstaltungsCode valid: " + JSON.stringify(data));
          resolve(null)
        },
        err => {
          console.info("VeranstaltungsCode invalid: " + JSON.stringify(err))
          resolve({
            "codeInvalid": true
          })
        }
      )
    });
  }

}