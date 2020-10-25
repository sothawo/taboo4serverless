import React from "react";
import {Meta, Story} from "@storybook/react";
import {Header, HeaderProps} from './Header';

export default {
    title: "taboo4/Header",
    component: Header
} as Meta;

const Template: Story<HeaderProps> = (args: HeaderProps) => <Header {...args}/>;

export const ToggleButtonsNotActive = Template.bind({});
ToggleButtonsNotActive.args = {
}

export const ToggleButtonsActive = Template.bind({});
ToggleButtonsActive.args = {
    selectedActive: true,
    availableActive: true,
    logsActive: true,
    settingsActive: true
}
