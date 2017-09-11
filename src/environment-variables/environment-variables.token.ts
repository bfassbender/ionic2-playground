import { InjectionToken } from "@angular/core";

//We use an InjectionToken. See https://angular.io/guide/dependency-injection#dependency-injection-tokens for more details.
export const EnvVariables = new InjectionToken<ApiConfig>('env.variables');

export interface ApiConfig {
  uploadUrl: string;
  checkAccessUrl: string;
  loadGalleryUrl: string;
  apikey: string;
  defaultSubFolder: string;
  gaKey: string;
}