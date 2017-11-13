import { FormControl } from '@angular/forms';
import { PortraitArchivApiProvider } from '../providers/portrait-archiv-api/portrait-archiv-api';
import { HttpErrorResponse } from '@angular/common/http';

export function createVeranstaltungsCodeValidator(api: PortraitArchivApiProvider, component) {
  return function(control:FormControl) {
    return new Promise((resolve,reject) => {
      if(!control.dirty) {
         resolve(null);
      }
      api.validateVeranstaltungsCode(control.value).subscribe(
        data => {
          console.info(`VeranstaltungsCode '${control.value}' valid: ${JSON.stringify(data)}`);
          resolve(null)
        },
        (err : HttpErrorResponse) => {
          console.info(`VeranstaltungsCode '${control.value}' invalid: ${err.error}`);
          resolve({
            "codeInvalid": true
          })
        }
      )
    });
  }

}