import React from "react";
import {Header, HeaderProps} from './Header';
import {Meta, Story} from "@storybook/react";

export default {
    title: "taboo4/Header",
    component: Header
} as Meta;

const Template: Story<HeaderProps> = (args: HeaderProps) => <Header {...args}/>;


export const InitialSetup = Template.bind({});
InitialSetup.args = {
}
