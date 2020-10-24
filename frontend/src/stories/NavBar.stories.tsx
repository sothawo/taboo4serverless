import React from "react";
import {NavBar, NavBarProps} from '../NavBar';
import {Meta, Story} from "@storybook/react";

export default {
    title: "taboo4/NavBar",
    component: NavBar
} as Meta;

const Template: Story<NavBarProps> = (args: NavBarProps) => <NavBar {...args}/>;


export const InitialSetup = Template.bind({});
InitialSetup.args = {
}
