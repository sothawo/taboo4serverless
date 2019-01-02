import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {TagsComponent} from "./tags.component";

describe("TagsComponent", () => {
    let component: TagsComponent;
    let fixture: ComponentFixture<TagsComponent>;
    let componentElement: HTMLElement;

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
        componentElement = fixture.debugElement.nativeElement;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("has a .card div", () => {
        expect(componentElement.querySelector(".card")).toBeTruthy();
    });

    it("is has a header that is displayed in a .card-header div", () => {
        component.header = "a big head";
        fixture.detectChanges();
        expect(component.header).toBeTruthy();
        expect(componentElement.querySelector(".card-header").textContent).toBe(component.header);
    });

    it("has a .card-body", () => {
        expect(componentElement.querySelector(".card-body")).toBeTruthy();
    });
});
