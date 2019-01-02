import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";

import {BackendService} from "./backend.service";

describe("BackendService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            HttpClient, HttpHandler
        ]
    }));

    it("should be created", () => {
        const service: BackendService = TestBed.get(BackendService);
        expect(service).toBeTruthy();
    });
});
