import React from "react";
import {Meta, Story} from "@storybook/react";
import {TagList, TagListProps} from "./TagList";

export default {
    title: "taboo4/TagList",
    component: TagList
} as Meta;

const Template: Story<TagListProps> = (args: TagListProps) => <TagList {...args}/>

export const TagListIsEmpty = Template.bind({})
TagListIsEmpty.args = {
    title: "some tags"
}

export const TagListIsNotEmpty = Template.bind({})
TagListIsNotEmpty.args = {
    title: "some tags",
    tags: ["some", "tags", "that", "should", "be", "ordered"]
}
