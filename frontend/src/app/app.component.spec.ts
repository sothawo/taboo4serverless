import {Component, Input} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {BackendService} from "./backend.service";
import {LogService} from "./log.service";
import {of} from "rxjs";

@Component({selector: "app-settings", template: ""})
class SettingsComponentStub {
}

@Component({selector: "app-tags", template: ""})
class TagsComponentStub {
    @Input()
    tags: string[]
}

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let componentElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SettingsComponentStub,
                TagsComponentStub
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
                        }
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        componentElement = fixture.debugElement.nativeElement;
    }));

    it("should create the app", () => {
        expect(component).toBeTruthy();
    });

    it("should have a nav tag", () => {
        fixture.detectChanges();
        expect(componentElement.querySelector("nav")).toBeTruthy();
    });

    describe("should toggle states of", () => {

        it("the settingsVisible flag", () => {
            expect(component.settingsVisible).toBeFalsy();
            component.onSettingsClicked();
            expect(component.settingsVisible).toBeTruthy();
            component.onSettingsClicked();
            expect(component.settingsVisible).toBeFalsy();
        });

        it("the selectedTagsVisible flag", () => {
            expect(component.selectedTagsVisible).toBeTruthy();
            component.onSelectedTagsClicked();
            expect(component.selectedTagsVisible).toBeFalsy();
            component.onSelectedTagsClicked();
            expect(component.selectedTagsVisible).toBeTruthy();
        });

        it("the availableTagsVisible flag", () => {
            expect(component.availableTagsVisible).toBeTruthy();
            component.onAvailableTagsClicked();
            expect(component.availableTagsVisible).toBeFalsy();
            component.onAvailableTagsClicked();
            expect(component.availableTagsVisible).toBeTruthy();
        });
    });

    it("should call the backend when onTest() is called", () => {
        component.onTest();
        expect(component.backendConfig).toBe('{"AWSRegion":"middleearth","tableName":"mordor"}');
    })
});
