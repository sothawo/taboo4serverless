import {TestBed} from "@angular/core/testing";

import {LogService} from "./log.service";
import {LogListener} from "./log.listener";

describe("LogService", () => {
    let service: LogService;

    beforeEach(() => TestBed.configureTestingModule({}));

    beforeEach(() => {
        service = TestBed.get(LogService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("works with Listeners", () => {
        it("can register and unregister sa listener", () => {
            let listener: LogListener = new class implements LogListener {
                add(...messages: string[]) {
                }
            };

            service.addListener(listener);
            expect(service.listeners.has(listener)).toBeTruthy();

            service.removeListener(listener);
            expect(service.listeners.has(listener)).toBeFalsy();
        });

        it("sends messages to listeners", () => {
            let collectedMessages: string[] = [];
            let listener: LogListener = new class implements LogListener {
                add(...messages: string[]) {
                    collectedMessages.push(...messages);
                }
            };
            service.addListener(listener);
            service.debug("hello");
            service.debug("world");

            expect(collectedMessages.length).toBe(2);
            expect(collectedMessages[0]).toBe("DEBUG : hello");
            expect(collectedMessages[1]).toBe("DEBUG : world");
        });
    });
});
