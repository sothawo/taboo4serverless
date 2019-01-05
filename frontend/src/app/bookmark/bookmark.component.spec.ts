import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BookmarkComponent} from "./bookmark.component";
import {DebugElement} from "@angular/core";
import {Bookmark} from "../data/bookmark";

describe("BookmarkComponent", () => {
    let component: BookmarkComponent;
    let fixture: ComponentFixture<BookmarkComponent>;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    const bookmark: Bookmark = new Bookmark("id1", "url1", "title1", ["tag1", "tag2"]);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookmarkComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookmarkComponent);
        component = fixture.componentInstance;
        component.bookmark = bookmark;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("has a layout with", () => {
        it("a .card div", () => {
            expect(nativeElement.querySelector("div .card")).toBeTruthy();
        });

        it("a .card-body div", () => {
            expect(nativeElement.querySelector("div .card-body")).toBeTruthy();
        });

        it("has a .card-title containing the bookmark title", () => {
            const elementTitle = nativeElement.querySelector("div .card-title");

            expect(elementTitle).toBeTruthy();
            expect(elementTitle.textContent).toBe(bookmark.title);
        });
        it("has a .card-text containing a link with the bookmark url that opens in a new target", () => {
            const elementText = nativeElement.querySelector("div .card-text");

            expect(elementText).toBeTruthy();

            const elementLink = elementText.querySelector("a");
            expect(elementLink).toBeTruthy();

            expect(elementLink.textContent).toBe(bookmark.url);
            expect(elementLink.getAttribute("href")).toBe(bookmark.url);
            expect(elementLink.getAttribute("target")).toBe("_blank");
        });
    });
});
