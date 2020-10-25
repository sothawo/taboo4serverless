import React from 'react';
import {render, screen} from '@testing-library/react';
import {BookmarkEntry, BookmarkEntryProps} from "./BookmarkEntry";
import {Bookmark} from "./Bookmark";

describe("a BookmarkEntry", () => {

    const props: BookmarkEntryProps = {
        bookmark: new Bookmark("42", "https://www.sothawo.com", "sothawo-website", ["cool", "unbelievable"]),
        onEdit: id => {},
        onDelete: id => {}
    }

    test("should render the title", () => {

        render(<BookmarkEntry { ...props } />);

        let element = screen.getByText(props.bookmark.title);
        expect(element).toBeInTheDocument()

    })

    test("should render the URL", () => {

        render(<BookmarkEntry { ...props } />);

        let element = screen.getByText(props.bookmark.url);
        expect(element).toBeInTheDocument()

    })

    test("should render the tags", () => {

        render(<BookmarkEntry { ...props } />);

        props.bookmark.tags.forEach((tag) => {
            let element = screen.getByText(new RegExp(tag));
            expect(element).toBeInTheDocument()
        })
    })
})
