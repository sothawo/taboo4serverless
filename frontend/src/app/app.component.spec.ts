import {Component, DebugElement, Input} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {AppComponent} from './app.component';
import {BackendService} from './backend.service';
import {Bookmark} from './data/bookmark';

@Component({selector: 'app-settings', template: ''})
class StubSettingsComponent {
}

@Component({selector: 'app-editor', template: ''})
class StubEditorComponent {
    @Input() bookmark: Bookmark;
}

@Component({selector: 'app-tags', template: ''})
class StubTagsComponent {
    @Input() tags: string[];
}

@Component({selector: 'app-log', template: ''})
class StubLogComponent {
}

@Component({selector: 'app-bookmark', template: ''})
class StubBookmarkComponent {
    @Input() bookmark: Bookmark;
    @Input() even: boolean;
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                StubSettingsComponent, StubEditorComponent, StubTagsComponent, StubLogComponent, StubBookmarkComponent
            ],
            providers: [
                {
                    provide: BackendService, useValue: {
                        config: () => {
                            return of({
                                AWSRegion: 'middleearth',
                                tableName: 'mordor'
                            });
                        },
                        allTags: () => {
                            return of([]);
                        },
                        bookmarksByTags: () => {
                            return of([]);
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

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have a nav tag', () => {
        fixture.detectChanges();
        expect(nativeElement.querySelector('nav')).toBeTruthy();
    });

    describe('should toggle states of', () => {

        it('the settingsVisible flag', () => {
            expect(component.settingsVisible).toBeFalsy();
            component.onSettingsVisibleClicked();
            expect(component.settingsVisible).toBeTruthy();
            component.onSettingsVisibleClicked();
            expect(component.settingsVisible).toBeFalsy();
        });

        it('the selectedTagsVisible flag', () => {
            expect(component.selectedTagsVisible).toBeTruthy();
            component.onSelectedTagsVisibleClicked();
            expect(component.selectedTagsVisible).toBeFalsy();
            component.onSelectedTagsVisibleClicked();
            expect(component.selectedTagsVisible).toBeTruthy();
        });

        it('the availableTagsVisible flag', () => {
            expect(component.availableTagsVisible).toBeTruthy();
            component.onAvailableTagsVisibleClicked();
            expect(component.availableTagsVisible).toBeFalsy();
            component.onAvailableTagsVisibleClicked();
            expect(component.availableTagsVisible).toBeTruthy();
        });

        it('the logVisible flag', () => {
            expect(component.logVisible).toBeFalsy();
            component.onLogVisibleClicked();
            expect(component.logVisible).toBeTruthy();
            component.onLogVisibleClicked();
            expect(component.logVisible).toBeFalsy();
        });
    });

    describe('buttons exist and call the handler', () => {
        it('initial load', () => {
            let button = debugElement.query(By.css('#init'));
            expect(button).toBeTruthy();
            component.availableTags.add('remove-me');
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.availableTags.size).toBe(0);
        });

        it('selected', () => {
            let button = debugElement.query(By.css('#selected'));
            expect(button).toBeTruthy();
            component.selectedTagsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.selectedTagsVisible).toBeTruthy();
        });
        it('selected-xs', () => {
            let button = debugElement.query(By.css('#selected-xs'));
            expect(button).toBeTruthy();
            component.selectedTagsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.selectedTagsVisible).toBeTruthy();
        });

        it('available', () => {
            let button = debugElement.query(By.css('#available'));
            expect(button).toBeTruthy();
            component.availableTagsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.availableTagsVisible).toBeTruthy();
        });
        it('available-xs', () => {
            let button = debugElement.query(By.css('#available-xs'));
            expect(button).toBeTruthy();
            component.availableTagsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.availableTagsVisible).toBeTruthy();
        });

        it('log', () => {
            let button = debugElement.query(By.css('#log'));
            expect(button).toBeTruthy();
            component.logVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.logVisible).toBeTruthy();
        });

        it('settings', () => {
            let button = debugElement.query(By.css('#settings'));
            expect(button).toBeTruthy();
            component.settingsVisible = false;
            fixture.detectChanges();
            button.triggerEventHandler('click', null);
            expect(component.settingsVisible).toBeTruthy();
        });
    });

    describe('with bookmarks', () => {
        it('has an app-bookmark for each bookmark', () => {
            component.bookmarks.push(new Bookmark('id1', 'url1', 'title1', ['tag11', 'tag12']));
            component.bookmarks.push(new Bookmark('id2', 'url2', 'title2', ['tag21', 'tag22']));
            fixture.detectChanges();
            const elements = debugElement.queryAll(By.css('app-bookmark'));

            expect(elements.length).toBe(2);
        });
    });
});
