import React from "react";
import {Bookmark} from "./Bookmark";
import {BookmarkEntry} from "./BookmarkEntry";

export interface BookmarksProps {
    /** the bookmarks to display.*/
    bookmarks: Bookmark[],
    /** function to call when a bookmark should be edited. */
    onEdit: (id: string) => void
    /** function to call when a bookmark should be deleted. */
    onDelete: (id: string) => void
}

export const Bookmarks = (props: BookmarksProps) =>
    <>
        {props.bookmarks && props.bookmarks.map((bookmark, index) =>
            <BookmarkEntry key={index} bookmark={bookmark} onEdit={props.onEdit} onDelete={props.onDelete}/>
        )}
    </>
