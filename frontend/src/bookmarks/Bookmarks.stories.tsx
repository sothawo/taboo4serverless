import React from "react";
import {Meta, Story} from "@storybook/react";
import {Bookmarks, BookmarksProps} from "./Bookmarks";
import {Bookmark} from "./Bookmark";

export default {
    title: "taboo4/Bookmarks",
    component: Bookmarks
} as Meta;

const Template: Story<BookmarksProps> = (args: BookmarksProps) => <Bookmarks {...args} />;

export const BookmarksAreEmpty = Template.bind({})
BookmarksAreEmpty.args = {}

export const BookmarksAreSet = Template.bind({});
BookmarksAreSet.args = {
    bookmarks: [new Bookmark("42", "https://www.sothawo.com", "sothawo-website", ["cool", "unbelievable"]),
        new Bookmark("43", "https://www.pjmeisch.de", "P.J.", ["cool", "quite old"])]
};

