import React from "react";
import {Bookmark} from "./Bookmark";
import {BookmarkEntry} from "./BookmarkEntry";

export interface BookmarksProps {
    /** the bookmarks to display.*/
    bookmarks: Bookmark[],
    /** function to call when a bookmark should be edited. */
    onEdit: (bookmark: Bookmark) => void
    /** function to call when a bookmark should be deleted. */
    onDelete: (bookmark: Bookmark) => void
}

export const Bookmarks: React.FunctionComponent<BookmarksProps> = (props) =>
    <>
        {props.bookmarks && props.bookmarks.map((bookmark, index) =>
            <BookmarkEntry key={index} bookmark={bookmark} onEdit={props.onEdit} onDelete={props.onDelete}/>
        )}
    </>
