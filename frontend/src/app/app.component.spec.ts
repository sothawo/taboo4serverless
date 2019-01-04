import {Component, DebugElement, Input} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {BackendService} from "./backend.service";
import {LogService} from "./log.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

@Component({selector: "app-settings", template: ""})
class SettingsComponentStub {
}

@Component({selector: "app-tags", template: ""})
class TagsComponentStub {
    @Input()
    tags: string[]
}

@Component({selector: "app-log", template: ""})
class LogComponentStub {
}

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SettingsComponentStub, TagsComponentStub, LogComponentStub
            ],
            providers: [
                {
                    provide: LogService, useValue: {
                        debug: (any) => {
                        }
                    }
                },
                {
                    provide: BackendService, useValue: {
                        config: () => {
                            return of({
                                AWSRegion: "middleearth",
                                tableName: "mordor"
                            })
                        },
                        allTags: () => {
                            return of([])
                        }
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        debugElement = fixture.debugElement;
        component = debugElement.componentInstance;
        nativeElement = debugElement.nativeElement;
    }));

    it("should create the app", () => {
        expect(component).toBeTruthy();
    });

    it("should have a nav tag", () => {
        fixture.detectChanges();
        expect(nativeElement.querySelector("nav")).toBeTruthy();
    });

    describe("should toggle states of", () => {

        it("the settingsVisible flag", () => {
            expect(component.settingsVisible).toBeFalsy();
            component.onSettingsVisibleClicked();
            expect(component.settingsVisible).toBeTruthy();
            component.onSettingsVisibleClicked();
            expect(component.settingsVisible).toBeFalsy();
        });

        it("the selectedTagsVisible flag", () => {
            expect(component.selectedTagsVisible).toBeTruthy();
            component.onSelectedTagsVisibleClicked();
            expect(component.selectedTagsVisible).toBeFalsy();
            component.onSelectedTagsVisibleClicked();
            expect(component.selectedTagsVisible).toBeTruthy();
        });

        it("the availableTagsVisible flag", () => {
            expect(component.availableTagsVisible).toBeTruthy();
            component.onAvailableTagsVisibleClicked();
            expect(component.availableTagsVisible).toBeFalsy();
            component.onAvailableTagsVisibleClicked();
            expect(component.availableTagsVisible).toBeTruthy();
        });

        it("the logVisible flag", () => {
            expect(component.logVisible).toBeFalsy();
            component.onLogVisibleClicked();
            expect(component.logVisible).toBeTruthy();
            component.onLogVisibleClicked();
            expect(component.logVisible).toBeFalsy();
        });
    });

    describe("buttons exist and call the handler", () => {
        it("initial load", () => {
            let button = debugElement.query(By.css("#init"));
            expect(button).toBeTruthy();
            component.availableTags.add("remove-me");
            fixture.detectChanges();
            button.triggerEventHandler("click", null);
            expect(component.availableTags.size).toBe(0);
        });

        it("selected", () => {
            let button = debugElement.query(By.css("#selected"));
            expect(button).toBeTruthy();
            component.selectedTagsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler("click", null);
            expect(component.selectedTagsVisible).toBeTruthy();
        });

        it("available", () => {
            let button = debugElement.query(By.css("#available"));
            expect(button).toBeTruthy();
            component.availableTagsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler("click", null);
            expect(component.availableTagsVisible).toBeTruthy();
        });

        it("log", () => {
            let button = debugElement.query(By.css("#log"));
            expect(button).toBeTruthy();
            component.logVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler("click", null);
            expect(component.logVisible).toBeTruthy();
        });

        it("settings", () => {
            let button = debugElement.query(By.css("#settings"));
            expect(button).toBeTruthy();
            component.settingsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler("click", null);
            expect(component.settingsVisible).toBeTruthy();
        });
    });

    it("should call the backend when onTest() is called", () => {
        component.onTest();
        expect(component.backendConfig).toBe('{"AWSRegion":"middleearth","tableName":"mordor"}');
    })
});
