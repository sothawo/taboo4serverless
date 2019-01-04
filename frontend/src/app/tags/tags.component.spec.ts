import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {TagsComponent} from "./tags.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe("TagsComponent", () => {
    let component: TagsComponent;
    let fixture: ComponentFixture<TagsComponent>;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TagsComponent);
        component = fixture.componentInstance;
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

    it("is has a header that is displayed in a .card-header div", () => {
        component.header = "a big head";
        fixture.detectChanges();
        expect(component.header).toBeTruthy();
        expect(nativeElement.querySelector(".card-header").textContent).toBe(component.header);
    });

    it("has a .card-body", () => {
        expect(nativeElement.querySelector(".card-body")).toBeTruthy();
    });

    describe("when using tags", () => {
        it("has no initial tags", () => {
            expect(component.tags.size).toBe(0);
            fixture.detectChanges();
            expect(nativeElement.querySelectorAll('button').length).toBe(0)
        });

        it("has a button for each tag, sorted by tag", () => {
            component.tags = new Set(["one", "two", "three"]);
            fixture.detectChanges();
            let bottonElements = nativeElement.querySelectorAll('button');
            expect(bottonElements.length).toBe(3)
            expect(bottonElements.item(0).textContent).toBe("one")
            expect(bottonElements.item(1).textContent).toBe("three")
            expect(bottonElements.item(2).textContent).toBe("two")
        });

        it("should emit an event with a tag name when clicking a button", () => {
            component.tags = new Set(["click-me"]);
            fixture.detectChanges();
            let bottonDebugElement = debugElement.query(By.css("button"));
            let selectedTag: string ="oops";
            component.selected.subscribe((tag: string) => selectedTag = tag)

            bottonDebugElement.triggerEventHandler("click", null);

            expect(selectedTag).toBe("click-me");
        });
    });
});
