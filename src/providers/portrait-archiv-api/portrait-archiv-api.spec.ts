import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Observable } from 'rxjs/Rx';

import { PortraitArchivApiProvider } from './portrait-archiv-api';
import { EnvironmentsModule } from '../../environment-variables/environment-variables.module';

describe('Portrait Archiv API Provider', () => {
    let cut: PortraitArchivApiProvider;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, EnvironmentsModule ],
            providers: [ PortraitArchivApiProvider, ]
            });

        
        cut = TestBed.get(PortraitArchivApiProvider);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be instanciated', () => {
        expect(cut).toBeTruthy();
    });

    it('validateVeranstaltungsCode() should return the response data on HTTP 200', () => {

        //Return fake success response according to http://api.portrait-service.com/#api-accountService-checkAccess
        let mockResponse = { "success":true };

        cut.validateVeranstaltungsCode("some-valid-veranstaltungscode").subscribe(res => {
            expect(res).toBe(mockResponse);
        });
        
        let validateVeranstaltungsCodeRequest = httpMock.expectOne({
            url: '/rest/accountService/checkAccess?apikey=fa25kfad89hasdj3bZv&galerieCode=some-valid-veranstaltungscode',
            method: 'GET'
          });
        validateVeranstaltungsCodeRequest.flush(mockResponse);
        httpMock.verify();
    });

  
});

