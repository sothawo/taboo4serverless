import {TestBed} from "@angular/core/testing";

import {LogService} from "./log.service";
import {LogData, LogLevel, LogListener} from "./log-listener";

describe("LogService", () => {
    let service: LogService;

    beforeEach(() => TestBed.configureTestingModule({}));

    beforeEach(() => {
        service = TestBed.get(LogService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("has different log levels", () => {

    });

    describe("works with Listeners", () => {
        it("can register and unregister sa listener", () => {
            let listener: LogListener = new class implements LogListener {
                log(logData: LogData) {
                }
            };

            service.addListener(listener);
            expect(service.listeners.has(listener)).toBeTruthy();

            service.removeListener(listener);
            expect(service.listeners.has(listener)).toBeFalsy();
        });

        it("sends messages to listeners", () => {
            let collectedData: LogData[] = [];
            let listener: LogListener = new class implements LogListener {
                log(logData: LogData) {
                    collectedData.push(logData);
                }
            };
            service.addListener(listener);
            service.debug("hello");
            service.debug("world");

            expect(collectedData.length).toBe(2);
        });
    });

    describe("has a message store", () => {
        it("that is initially empty", () => {
            expect(service.messages.length).toBe(0);
        })

        it("that collects the logData entries", () => {
            let logData = new LogData(LogLevel.INFO, "info");
            service.log(logData);
            expect(service.messages.length).toBe(1)
            expect(service.messages[0]).toBe(logData);
        });

        it("that can be cleared", () => {
            let logData = new LogData(LogLevel.INFO, "info");
            service.log(logData);
            service.clear();
            expect(service.messages.length).toBe(0)
        });
    });
});
