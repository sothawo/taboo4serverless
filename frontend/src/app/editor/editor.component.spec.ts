import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {EditorComponent} from './editor.component';
import {DebugElement} from '@angular/core';
import {Bookmark} from '../data/bookmark';

describe('EditorComponent', () => {
    let component: EditorComponent;
    let fixture: ComponentFixture<EditorComponent>;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorComponent],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('with no initial bookmark', () => {

        it('should have an empty input for the url', () => {
            const input = nativeElement.querySelector<HTMLInputElement>('#url');

            expect(input.value).toBe('');
        });

        it('should have an empty input for the title', () => {
            const input = nativeElement.querySelector<HTMLInputElement>('#title');

            expect(input.value).toBe('');
        });

        it('should have an empty input for the tags', () => {
            const input = nativeElement.querySelector<HTMLInputElement>('#tags');

            expect(input.value).toBe('');
        });
    });

    describe('with  initial bookmark', () => {

        const bookmark = new Bookmark('id', 'url', 'title', ['tag1', 'tag2']);

        it('should have the url input filled', () => {
            component.setBookmark(bookmark);
            const input = nativeElement.querySelector<HTMLInputElement>('#url');
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(input.value).toBe(bookmark.url);
            });
        });

        it('should have the title input filled', () => {
            const input = nativeElement.querySelector<HTMLInputElement>('#title');
            component.setBookmark(bookmark);
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(input.value).toBe(bookmark.title);
            });
        });

        it('should have the tags input filled', () => {
            component.setBookmark(bookmark);
            const input = nativeElement.querySelector<HTMLInputElement>('#tags');
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(input.value).toBe(bookmark.joinedTags());
            });
        });
    });

    it('splits tags', () => {
        let tags = component.splitTags('');
        expect(tags.length).toBe(0);

        tags = component.splitTags('one');
        expect(tags.length).toBe(1);
        expect(tags[0]).toBe('one');

        tags = component.splitTags('one two');
        expect(tags.length).toBe(2);
        expect(tags[0]).toBe('one');
        expect(tags[1]).toBe('two');

        tags = component.splitTags('one   two');
        expect(tags.length).toBe(2);
        expect(tags[0]).toBe('one');
        expect(tags[1]).toBe('two');

        tags = component.splitTags('one,two');
        expect(tags.length).toBe(2);
        expect(tags[0]).toBe('one');
        expect(tags[1]).toBe('two');

        tags = component.splitTags('one;two');
        expect(tags.length).toBe(2);
        expect(tags[0]).toBe('one');
        expect(tags[1]).toBe('two');

        tags = component.splitTags('one.two');
        expect(tags.length).toBe(2);
        expect(tags[0]).toBe('one');
        expect(tags[1]).toBe('two');
    });
});
