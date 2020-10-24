import React from "react";
import {Button, Card} from "react-bootstrap";
import "./TagList.css";

/**
 * TagList properties
 */
export interface TagListProps {
    /** the title to show. */
    title: string,
    /** the tags to display. */
    tags?: string[],
    /** function that is called when a tag is selected. */
    onSelect: (tag: string) => void
}

/**
 * a Card with a header displaying ta sorted list of tags
 * @param props the properties for the TagList
 * @constructor
 */
export const TagList = (props: TagListProps) =>
    <Card>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
            {props.tags && sortedTags(props.tags).map((tag, index) => {
                return <Button variant={"outline-secondary"} size={"sm"} key={index}
                               className={"taglist-entry"} onClick={() => props.onSelect(tag)}>
                    {tag}
                </Button>
            })}
        </Card.Body>
    </Card>

const sortedTags = (tags: string[]) => {
    return Array.from(tags).sort();
}
