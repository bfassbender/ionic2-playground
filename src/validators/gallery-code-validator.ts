import { FormControl } from '@angular/forms';
 
export class GalleryCodeValidator {
 
    static validateCode(control: FormControl): any {
 
    return new Promise(resolve => {
      if(!control.dirty) {
         resolve(null);
      }

      //Fake a slow response from server
      setTimeout(() => {
        if(control.value.toLowerCase() === "11111-1111-1111"){
 
          resolve({
            "codeInvalid": true
          });
 
        } else {
          resolve(null);
        }
      }, 2000);
 
    });
  }
 
}