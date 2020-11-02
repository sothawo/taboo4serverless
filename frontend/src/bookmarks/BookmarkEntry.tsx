import React from "react";
import {Button, Card, Image} from "react-bootstrap";
import {Bookmark} from "./Bookmark";
import trashcan from "../assets/trashcan.svg";
import pencil from "../assets/pencil.svg";
import styles from "./BookmarkEntry.module.css";

/**
 * BookmarkEntry properties.
 */
export interface BookmarkEntryProps {
    /** the bookmark to display.*/
    bookmark: Bookmark,
    /** function to call when the bookmark should be edited. */
    onEdit: (bookmark: Bookmark) => void
    /** function to call when the bookmark should be deleted. */
    onDelete: (bookmark: Bookmark) => void
}

export const BookmarkEntry: React.FunctionComponent<BookmarkEntryProps> = (props) =>
    <Card className={styles.card}>
        <Card.Header className={`d-flex ${styles.cardHeader}`}>{props.bookmark.title}
            <Button variant={"outline-dark"} size={"sm"} className={`ml-auto ${styles.edit}`} onClick={() => props.onEdit(props.bookmark)}>
                <Image src={pencil}/>
            </Button>
            <Button variant={"outline-dark"} size={"sm"} className={`delete ${styles.delete}`} onClick={() => props.onDelete(props.bookmark)}>
                <Image src={trashcan}/>
            </Button>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
            <Card.Text className={styles.cardText}><a href={props.bookmark.url} target={"_blank"} rel={"noreferrer"}>{props.bookmark.url}</a></Card.Text>
            <Card.Text className={styles.cardBodyTags}>{props.bookmark.joinedTags()}</Card.Text>
        </Card.Body>
    </Card>

