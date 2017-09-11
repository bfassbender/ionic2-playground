import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, ResponseType } from "@angular/http";
import { FixedMockBackend, FixedMockConnection } from '../../testing/fixed-mock-backend';

import { Observable } from 'rxjs/Rx';

import { PortraitArchivApiProvider } from './portrait-archiv-api';

describe('Portrait Archiv API Provider', () => {
    let cut: PortraitArchivApiProvider;
    let mockBackend: FixedMockBackend
    let spy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [ PortraitArchivApiProvider,
                         FixedMockBackend, 
                         BaseRequestOptions, 
                         {
                            provide: Http,
                            useFactory: (backend, options) => new Http(backend, options),
                            deps: [FixedMockBackend, BaseRequestOptions]
                         } ]
        }).compileComponents();

        mockBackend = TestBed.get(FixedMockBackend);
        cut = TestBed.get(PortraitArchivApiProvider);
    });

    it('should be instanciated', () => {
        expect(cut).toBeTruthy();
    });

    it('validateVeranstaltungsCode() should return the response data on HTTP 200', fakeAsync(() => {

        //Return fake success response according to http://api.portrait-service.com/#api-accountService-checkAccess
        let mockResponsePayload = "success:true";
        let mockResponseCode = 200;
        
        mockBackend.connections.subscribe( (connection : FixedMockConnection) => {
            connection.mockRespond(new Response(<ResponseOptions>{
                status: mockResponseCode,
                body: JSON.stringify(mockResponsePayload)
            }));
        });

        let response;

        cut.validateVeranstaltungsCode("some-valid-veranstaltungscode").subscribe(data => {
            response = data;
        })

        tick();

        expect(response).toBe("success:true");
    }));

    it('validateVeranstaltungsCode() should return an error on a response other than HTTP 200-299', fakeAsync(() => {

       //Return fake success response according to http://api.portrait-service.com/#api-accountService-checkAccess
        let mockResponsePayload = "";
        let mockResponseCode = 500;

        mockBackend.connections.subscribe( connection => {
            let response = new Response(<ResponseOptions>{
                status: mockResponseCode,
                body: JSON.stringify(mockResponsePayload)
            });
            response.type = ResponseType.Error;
            connection.mockRespond(response);
        });

        let error;

        cut.validateVeranstaltungsCode("some-valid-veranstaltungscode").subscribe(
            () => {},
            err => {
                console.log("Error!");
                error = err;
            }
        );
        
        tick();

        expect(error).toBe("success:true");
    }));
});

