import React from 'react';
import {render, screen} from '@testing-library/react';
import {TagList, TagListProps} from './TagList';

describe("a TagList", () => {

    test("should render the title", () => {

        const tagListProps: TagListProps = {
            title: "some title",
            tags: ["tag1"]
        }
        render(<TagList {...tagListProps} />);

        let element = screen.getByText(tagListProps.title);
        expect(element).toBeInTheDocument()
    })

    test("should render the tags", () => {
        const tagListProps: TagListProps = {
            title: "some title",
            tags: ["tag1", "hello", "world"]
        }
        render(<TagList {...tagListProps} />);

        tagListProps.tags?.forEach((tag) => {
            let element = screen.getByText(tag);
            expect(element).toBeInTheDocument()
        });
    })
})
