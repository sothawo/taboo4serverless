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
        it("default is INFO", () => {
            expect(service.logLevel).toBe(LogLevel.INFO);
        });

        it("respectes level ERROR", () => {
            service.logLevel = LogLevel.ERROR;
            service.debug("msg");
            service.info("msg");
            service.warn("msg");
            service.error("msg");

            expect(service.messages.length).toBe(1);
        })

        it("respectes level WARN", () => {
            service.logLevel = LogLevel.WARN;
            service.debug("msg");
            service.info("msg");
            service.warn("msg");
            service.error("msg");

            expect(service.messages.length).toBe(2);
        })

        it("respectes level INFO", () => {
            service.logLevel = LogLevel.INFO;
            service.debug("msg");
            service.info("msg");
            service.warn("msg");
            service.error("msg");

            expect(service.messages.length).toBe(3);
        })

        it("respectes level DEBUG", () => {
            service.logLevel = LogLevel.DEBUG;
            service.debug("msg");
            service.info("msg");
            service.warn("msg");
            service.error("msg");

            expect(service.messages.length).toBe(4);
        })
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
            service.info("hello");
            service.info("world");

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