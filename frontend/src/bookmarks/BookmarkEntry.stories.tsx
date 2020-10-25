import React from "react";
import {Meta, Story} from "@storybook/react";
import {BookmarkEntry, BookmarkEntryProps} from "./BookmarkEntry";
import {Bookmark} from "./Bookmark";

export default {
    title: "taboo4/Bookmarks",
    component: BookmarkEntry
} as Meta;

const Template: Story<BookmarkEntryProps> = (args: BookmarkEntryProps) => <BookmarkEntry {...args} />;

export const JustABookmark = Template.bind({});
JustABookmark.args = {
    bookmark: new Bookmark("42", "https://www.sothawo.com", "sothawo-website", ["cool", "unbelievable"])
};



