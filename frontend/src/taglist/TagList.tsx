import React from 'react';
import {Button, Card} from 'react-bootstrap';
import styles from './TagList.module.css';

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
 */
export const TagList : React.FunctionComponent<TagListProps> = (props) =>
    <Card className={styles.card}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body className={styles.cardBody}>
            {props.tags && sortedTags(props.tags).map((tag, index) => {
                return <Button variant={'outline-secondary'} size={'sm'} key={index}
                               className={styles.taglistEntry} onClick={() => props.onSelect(tag)}>
                    {tag}
                </Button>;
            })}
        </Card.Body>
    </Card>;

const sortedTags = (tags: string[]) => Array.from(tags).sort();
