import React from "react";
import {Meta, Story} from "@storybook/react";
import {App} from "./App";

export default {
    title: "taboo4/Application",
    component: App
} as Meta;

const Template: Story<any> = () => <App/>;

export const TheApp = Template.bind({});
