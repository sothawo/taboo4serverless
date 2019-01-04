import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LogComponent} from "./log.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {LogData, LogLevel} from "./log-listener";

describe("LogComponent", () => {
    let component: LogComponent;
    let fixture: ComponentFixture<LogComponent>;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogComponent);
        component = fixture.componentInstance;
        component.clear();
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("has a .card div", () => {
        expect(nativeElement.querySelector(".card")).toBeTruthy();
    });

    it("is has a header", () => {
        expect(nativeElement.querySelector(".card-header").textContent).toBe("logs");
    });

    it("has a .card-body", () => {
        expect(nativeElement.querySelector(".card-body")).toBeTruthy();
    });

    it("has a element to clear the list that works", () => {
        let msg1 = "hello";
        let msg2 = "world";
        component.log(new LogData(LogLevel.INFO, msg1));
        component.log(new LogData(LogLevel.WARN, msg2));
        expect(component.messages.length).toBe(2);
        let clearElement = debugElement.query(By.css("#clear"));

        expect(clearElement).toBeTruthy();
        clearElement.triggerEventHandler("click", null);

        expect(component.messages.length).toBe(0);
    });

    describe("handling messages", () => {
        it("has initially an empty logs list", () => {
            expect(component.messages.length).toBe(0);
        });

        it("adds messages to the list", () => {
            let msg1 = "hello";
            let msg2 = "world";
            component.log(new LogData(LogLevel.INFO, msg1));
            component.log(new LogData(LogLevel.WARN, msg2));
            expect(component.messages.length).toBe(2);
            expect(component.messages[0]).toBe("INFO\nhello");
            expect(component.messages[1]).toBe("WARN\nworld");
        });

        it("can clear the list", () => {
            component.log(new LogData(LogLevel.INFO, "one"));
            component.log(new LogData(LogLevel.WARN, "two"));
            expect(component.messages.length).toBe(2);
            component.clear();
            expect(component.messages.length).toBe(0);
        });

        it("puts messages in divs", () => {
            let msg1 = "hello";
            let msg2 = "world";
            component.log(new LogData(LogLevel.INFO, msg1));
            component.log(new LogData(LogLevel.WARN, msg2));
            fixture.detectChanges();
            let cardBody = nativeElement.querySelector(".card-body");
            let messageElements = cardBody.querySelectorAll("div .msg");
            expect(messageElements.length).toBe(2);
            expect(messageElements.item(0).textContent).toBe("INFO\nhello");
            expect(messageElements.item(1).textContent).toBe("WARN\nworld");
        });
    });
});
