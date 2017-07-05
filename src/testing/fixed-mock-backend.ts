import { MockBackend, MockConnection } from '@angular/http/testing';
import { ReadyState, Request, Response } from '@angular/http';

export class FixedMockConnection extends MockConnection {

    isSuccess = (status: number): boolean => (status >= 200 && status < 300);

    mockRespond(response: Response) {
        response.ok = this.isSuccess(response.status);

        if (response.ok) {
            super.mockRespond(response);
        } else {
            this.readyState = ReadyState.Done;
            this.response.error(response);
        }
    }

}

export class FixedMockBackend extends MockBackend {

    createConnection(req: Request): FixedMockConnection {
        if (!req || !(req instanceof Request)) {
            throw new Error(`createConnection requires an instance of Request, got ${req}`);
        }
        let connection = new FixedMockConnection(req);
        this.connections.next(connection);
        return connection;
    }

}